import { io } from 'socket.io-client';
import env from "../utils/get-env";
let socket;

export function connectSocket(token) {
    socket = io(env.SOCKET_URL, {
        auth: {
            token: token
        },
        extraHeaders: {
            "ngrok-skip-browser-warning": true
        },
    });
    return socket;
}

export function initSocketListners() {
    if (!socket) return;

    socket.on("connect_error", (error) => {
        console.log('[socket c]: ', error);
    });
    socket.on("error", (error) => {
        console.log('[socket e]: ', error);
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
    socket.emit("send-message:text", { text, to, messageType: "text" });
}

export function sendImageMessage(to, text, file) {
    if (!socket) return true;
    socket.emit("send-message:file", { to, text, file, messageType: "image" });
}

export function sendDocMessage(to, text, file) {
    if (!socket) return true;
    socket.emit("send-message:file", { to, text, file, messageType: "doc" });
}