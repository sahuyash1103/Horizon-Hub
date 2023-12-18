const { sendMessageText, sendGroupMessageText } = require("./message/send-message-text-socket");
const User = require("./../mongo/schema/userSchema");
const { sendMessageFile } = require("./message/send-message-file-socket");

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

    await User.findByIdAndUpdate(user._id, { $set: { isOnline: true } });
    console.log(`[Online] ${socket.user.email}`);

    sendMessageText(socket, io);
    sendMessageFile(socket, io);
    sendGroupMessageText(socket, io);
    joinRoom(socket, io);

    socket.on('disconnect', async () => {
        console.log(`[Disconnected] ${socket.user.email}`);
        console.log(`[Offline] ${socket.user.email}`);
        await User.findByIdAndUpdate(user._id, { $set: { isOnline: false } })
    });
}

module.exports = { onSocketConnection };