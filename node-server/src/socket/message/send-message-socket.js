const Message = require("../../mongo/schema/messageSchema");

const sendMessage = (socket, io) => {
    socket.on("send-message", async (data) => {
        const sendTo = data.friendId;
        const message = data.message;

        const messageObj = Message.create({
            messageType: "text",
            message: message,
            sentOn: new Date().toISOString(),
            sentBy: socket.user._id,
            sentTo: sendTo,
            isSent: true,
            isReceived: false,
            isRead: false,
            isDeleted: false,
            isPinned: false,
            isStarred: false,
            isForwarded: false,
        });

        await messageObj.save();

        const user = await User.findById(socket.user._id);
        const friend = await User.findById(sendTo);

        user.messages.push({ messageId: messageObj._id, sentBy: socket.user._id, sentTo: sendTo });
        friend.messages.push({ messageId: messageObj._id, sentBy: socket.user._id, sentTo: sendTo });

        user.friends.forEach((friend) => {
            if (friend.friendId === sendTo) {
                friend.lastMessage = message;
            }
        });

        friend.friends.forEach((friend) => {
            if (friend.friendId === socket.user._id) {
                friend.lastMessage = message;
            }
        });

        await user.save();
        await friend.save();
    });
};