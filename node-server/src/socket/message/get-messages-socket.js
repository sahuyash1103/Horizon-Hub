const { User } = require("../../mongo/schema/userSchema");
const { Message } = require("../../mongo/schema/messageSchema");
const { Group } = require("../../mongo/schema/groupSchema");
const _ = require("lodash");

const getMessagesData = (socket, io) => {
    socket.on("get-messages", async (data) => {
        const friendId = data.to;
        const user = await User.findById(socket.user._id).select(["_id", "messages", "unreadMessages"]).populate(["messages", "unreadMessages"]);;

        user.messages.forEach((message) => {
            if (message.sentBy.toString() === friendId.toString()) {
                message.isReceived = true;
                message.isRead = true;
            }
        });

        const messagesBW = user.messages.filter((message) => {
            return message.sentBy.toString() === friendId.toString() || message.sentTo.toString() === friendId.toString();
        });

        const messages = _.sortBy(messagesBW, ["sentOn"]);

        socket.emit("get-messages", { messages: messages });
    });
}

module.exports = { getMessagesData };