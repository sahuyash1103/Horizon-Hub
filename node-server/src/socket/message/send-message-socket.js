const User = require("../../mongo/schema/userSchema");
const Message = require("../../mongo/schema/messageSchema");
const Group = require("../../mongo/schema/groupSchema");

const sendMessage = (socket, io) => {
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
            await message.updateOne({ isReceived: true });
        });
        io.to(socket.user.email).emit("receive-message", { message: message });
    });
};

module.exports = { sendMessage };