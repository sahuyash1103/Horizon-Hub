const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("./../utils/get-env");

function authSocketMW(socket, next) {
    var token = socket.handshake.auth.token || socket.handshake.headers["x-auth-token"]

    if (!token) return next(new Error("Access denied. No token provided."));
    try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
        socket.user = decoded;
        next();
    } catch (ex) {
        const error = new Error("Invalid token.");
        next(error);
    }
}

module.exports = authSocketMW;