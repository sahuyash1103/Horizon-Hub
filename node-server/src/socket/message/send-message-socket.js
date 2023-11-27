const User = require("../../mongo/schema/userSchema");
const Message = require("../../mongo/schema/messageSchema");
const Group = require("../../mongo/schema/groupSchema");
const findFriendInUserSubCollection = require("../../utils/find-friend-in-user");

const sendMessageText = (socket, io) => {
    socket.on("send-message:text", async (data) => {
        const sendTo = data.to;
        const text = data.text;

        if (!sendTo || !text)
            return socket.emit("error", { message: "Invalid data" });

        const user = await User.findOne({ email: socket.user.email });
        if (!user)
            return socket.emit("error", { message: "User not found" });

        const friend = await User.findOne({ email: sendTo });
        if (!friend)
            return socket.emit("error", { message: "Friend not found" });

        const friendInUserSubCollection = await findFriendInUserSubCollection(user, friend._id);
        const conversationID = friendInUserSubCollection.friend.conversationID;
        const subCollection = friendInUserSubCollection.collection;

        if (!friendInUserSubCollection)
            return socket.emit("error", { message: "not in friend list" });

        const message = new Message({
            messageType: "text",
            message: text,
            sentOn: new Date().toISOString(),
            sentBy: user._id,
            sentTo: friend._id,
            conversationID: conversationID,
            isSent: true,
            isReceived: false,
            isRead: false,
            isDeleted: false,
            isPinned: false,
            isStarred: false,
            isForwarded: false,
        });

        await message.save();

        await user.updateOne({ $push: { messages: { message: message._id, sentBy: socket.user._id, sentTo: friend._id } } });

        await friend.updateOne({ $push: { unreadMessages: { message: message._id, sentBy: socket.user._id, sentTo: friend._id } } });

        await User.updateOne(
            {
                _id: user._id,
                [`${subCollection}.friend`]: friend._id
            },
            {
                $set: {
                    [`${subCollection}.$.lastMessage`]: message._id,
                    [`${subCollection}.$.lastMessageText`]: message.message
                }
            }
        );

        await User.updateOne(
            {
                _id: friend._id,
                [`${subCollection}.friend`]: user._id
            },
            {
                $set: {
                    [`${subCollection}.$.lastMessage`]: message._id,
                    [`${subCollection}.$.lastMessageText`]: message.message
                }
            }
        );

        io.to(sendTo).emit("receive-message", { message: message }, async () => {
            const updatedMessage = await message.updateOne({ isReceived: true }, { new: true });
            io.to(socket.user.email).emit("message-update", { message: updatedMessage });
        });
        io.to(socket.user.email).emit("receive-message", { message: message });
    });
};

const sendGroupMessageText = (socket, io) => {
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
            conversationID: group._id,
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