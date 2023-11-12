const { User } = require("../../../models/user");
const { Message } = require("../../../models/message");
const { Group } = require("../../../models/group");
const _ = require("lodash");

const getMessagesData = (socket, io) => {
    socket.on("get-messages", async (data) => {
        const friendId = data.friendId;
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