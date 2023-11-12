const { getFriendsData } = require("./friend/get-friends-socket");
const { getMessagesData } = require("./message/get-messages-socket");

const onSocketConnection = (io, socket) => {
    console.log(`[Connected] ID:${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`[Disconnected] ID:${socket.id} disconnected`);
    });

    getFriendsData(socket, io);
    getMessagesData(socket, io);
}

module.exports = { onSocketConnection };