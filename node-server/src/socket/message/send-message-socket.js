const User = require("../../mongo/schema/userSchema");
const Message = require("../../mongo/schema/messageSchema");
const Group = require("../../mongo/schema/groupSchema");

const sendMessageText = (socket, io) => {
    socket.on("send-message:text", async (data) => {
        const sendTo = data.to;
        const text = data.text;

        if (!sendTo || !text)
            return socket.emit("error", { message: "Invalid data" });

        const user = await User.findOne({ email: socket.user.email });
        const friend = await User.findOne({ email: sendTo });
        if (!user)
            return socket.emit("error", { message: "User not found" });

        if (!friend)
            return socket.emit("error", { message: "Friend not found" });

        const message = new Message({
            messageType: "text",
            message: text,
            sentOn: new Date().toISOString(),
            sentBy: user._id,
            sentTo: friend._id,
            isSent: true,
            isReceived: false,
            isRead: false,
            isDeleted: false,
            isPinned: false,
            isStarred: false,
            isForwarded: false,
        });

        await message.save();

        await user.updateOne({ messages: { $push: { message: message._id, sentBy: socket.user._id, sentTo: sendTo } } });
        await friend.updateOne({ unreadMessages: { $push: { message: message._id, sentBy: socket.user._id, sentTo: sendTo } } });

        io.to(sendTo).emit("receive-message", { message: message }, async () => {
            const updatedMessage = await message.updateOne({ isReceived: true }, { new: true });
            io.to(socket.user.email).emit("message-update", { message: updatedMessage });
        });
        io.to(socket.user.email).emit("receive-message", { message: message });
    });
};

const sendGroupMessageText = () => {
    socket.on("send-group-message:text", async (data) => {
        const grouID = data.to;
        const text = data.text;

        if (!sendTo || !text)
            return socket.emit("error", { message: "Invalid data" });

        const user = await User.findOne({ email: socket.user.email });
        const group = await Group.findById(grouID).populate('members', 'email');
        if (!user)
            return socket.emit("error", { message: "User not found" });

        if (!group)
            return socket.emit("error", { message: "group not found" });

        const message = new Message({
            messageType: "text",
            message: text,
            sentOn: new Date().toISOString(),
            sentBy: user._id,
            sentTo: friend._id,
            isSent: true,
            isReceived: false,
            isRead: false,
            isDeleted: false,
            isPinned: false,
            isStarred: false,
            isForwarded: false,
            isGroupMessage: true,
        });

        await message.save();

        await user.updateOne({ messages: { $push: { message: message._id, sentBy: socket.user._id, sentTo: sendTo } } });
        await group.updateOne({ message: { $push: { message: message._id, sentBy: socket.user._id, sentTo: sendTo } } });

        group.members.forEach((member) => {
            io.to(member.email).emit("receive-message", { message: message }, async () => {
                await message.updateOne({ isReceived: true });
            });
        });
        io.to(socket.user.email).emit("receive-message", { message: message });
    });
}

module.exports = { sendMessageText, sendGroupMessageText };