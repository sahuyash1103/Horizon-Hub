import { io } from 'socket.io-client';

let socket;

export function connectSocket(token) {
    socket = io("http://localhost:3001", {
        auth: {
            token: token
        }
    });
    return socket;
}

export function initSocketListners() {
    if (!socket) return;

    socket.on("connect_error", (error) => {
        console.log('[socket]: ', error);
    });
    socket.on("error", (error) => {
        console.log('[socket]: ', error);
    });

    socket.on("connect", () => {
        console.log('[socket]: connected');
    });

    socket.on("disconnect", () => {
        console.log('[socket]: disconnected');
    });
}

export function disconnectSocket() {
    if (socket) socket.disconnect();
}

export function subscribeToEvent(event, callback) {
    if (!socket) return true;
    socket.on(event, callback);
}

export function messageListner(cbr) {
    if (!socket) return true;
    socket.on("receive-message", cbr);
}

export function sendTextMessage(text, to) {
    if (!socket) return true;
    socket.emit("send-message:text", { text, to });
}