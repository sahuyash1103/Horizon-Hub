const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../utils/get-env");

function authenticateSocketConnection(socket, next) {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Access denied. No token provided."));
    try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
        socket.user = decoded;
        next();
    } catch (ex) {
        const error = new Error("Invalid token.");
        error.statusCode = 401;
        error.data = ex;
        next(error);
    }
}

module.exports = authenticateSocketConnection;