const { sendMessageText, sendGroupMessageText } = require("./message/send-message-socket");
const User = require("../mongo/schema/userSchema");

const joinRoom = (socket, io) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(`[Joined] ${socket.user.email}:${socket.id} joined ${data.room}`);
    });
}

const onSocketConnection = async (io, socket) => {
    console.log(`[Connected] ${socket.user.email}`);
    socket.join(socket.user.email);
    const user = await User.findOne({ email: socket.user.email });
    if (!user) return socket.emit("error", { message: "User not found" });
    socket.on('disconnect', () => {
        console.log(`[Disconnected] ${socket.user.email}`);
        user.updateOne({ isOnline: false });
    });
    if (!user.isOnline) {
        user.updateOne({ isOnline: true });
    }

    sendGroupMessageText(socket, io);
    sendMessageText(socket, io);
    joinRoom(socket, io);
}

module.exports = { onSocketConnection };