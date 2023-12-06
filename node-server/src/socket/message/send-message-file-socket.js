const User = require("../../mongo/schema/userSchema");
const Message = require("../../mongo/schema/messageSchema");
const Group = require("../../mongo/schema/groupSchema");
const findFriendInUserSubCollection = require("../../utils/find-friend-in-user");

const sendMessageFile = (socket, io) => {
    socket.on("send-message:file", async (data) => {
        const sendTo = data.to;
        const text = data.text;
        const messageType = data.messageType;

        if (!sendTo || !text)
            return socket.emit("error", { message: "Invalid data" });

        const user = await User.findOne({ email: socket.user.email });
        if (!user)
            return socket.emit("error", { message: "User not found" });

        const friend = await User.findOne({ email: sendTo });
        if (!friend)
            return socket.emit("error", { message: "Friend not found" });

        const friendInUserSubCollection = await findFriendInUserSubCollection(user, friend._id);
        if (!friendInUserSubCollection)
            return socket.emit("error", { message: "not in friend list" });

        const conversationId = friendInUserSubCollection.friend.conversationId;
        const subCollection = friendInUserSubCollection.collection;

        const message = new Message({
            messageType: messageType,
            text: text,
            sentOn: new Date().toISOString(),
            sentBy: user._id,
            sentTo: friend._id,
            conversationId: conversationId,
            isSent: true,
            isReceived: false,
            isRead: false,
            isDeleted: false,
            isPinned: false,
            isStarred: false,
            isForwarded: false,
        });

        await message.save();

        await User.findByIdAndUpdate(user._id,
            {
                $push: {
                    messages: {
                        message: message._id,
                        sentBy: socket.user._id,
                        sentTo: friend._id
                    }
                }
            });

        await User.findByIdAndUpdate(friend._id,
            {
                $push: {
                    unreadMessages: {
                        message: message._id,
                        sentBy: socket.user._id,
                        sentTo: friend._id
                    }
                }
            });

        await User.updateOne(
            {
                _id: user._id,
                [`${subCollection}.friend`]: friend._id
            },
            {
                $set: {
                    [`${subCollection}.$.lastMessage`]: message._id,
                    [`${subCollection}.$.lastMessageText`]: message.text
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
                    [`${subCollection}.$.lastMessageText`]: message.text
                }
            }
        );

        // if (friend.isOnline) 
        io.to(sendTo).emit("receive-message", { message: message }, async () => {
            const updatedMessage = await Message.findByIdAndUpdate(message._id,
                {
                    $set: {
                        isReceived: true
                    }
                }, { new: true });
            io.to(socket.user.email).emit("message-update", { message: updatedMessage });
        });

        // if (user.isOnline && (user.email !== friend.email)) 
        io.to(socket.user.email).emit("receive-message", { message: message });
    });
};


const sendGroupMessageFile = (socket, io) => {
    socket.on("send-group-message:file", async (data) => {
        const grouID = data.to;
        const text = data.text;
        const messageType = data.messageType;

        if (!sendTo || !text)
            return socket.emit("error", { message: "Invalid data" });

        const user = await User.findOne({ email: socket.user.email });
        const group = await Group.findById(grouID).populate('members', 'email');
        if (!user)
            return socket.emit("error", { message: "User not found" });

        if (!group)
            return socket.emit("error", { message: "group not found" });

        const message = new Message({
            messageType: messageType,
            text: text,
            sentOn: new Date().toISOString(),
            sentBy: user._id,
            sentTo: friend._id,
            conversationId: group._id,
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

        await User.findByIdAndUpdate(user._id,
            {
                messages: {
                    $push: {
                        message: message._id,
                        sentBy: socket.user._id,
                        sentTo: sendTo
                    }
                }
            });

        await Group.findByIdAndUpdate(group._id,
            {
                $push: {
                    messages: {
                        message: message._id,
                        sentBy: socket.user._id,
                        sendTo: sendTo
                    }
                },
                $set: {
                    lastMessage: message._id,
                    lastMessageText: message.text
                }
            });

        group.members.forEach((member) => {
            io.to(member.email).emit("receive-message", { message: message }, async () => {
                await Message.findByIdAndUpdate(message._id,
                    { isReceived: true });
            });
        });
    });
}

module.exports = { sendMessageFile };