//-------------------------IMPORTS
const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
var morgan = require('morgan')

const routes = require("./src/routes/index");

const { PORT } = require("./src/utils/get-env");
const { checkEnvironmentVariable } = require("./src/utils/check_env_var");
const { initMongo } = require("./src/mongo/index");
const { initFirebase } = require("./src/firebase/index");
const { onSocketConnection } = require("./src/socket");
const authenticateSocketConnection = require("./src/middlewares/auth-socket-connection");

//-----------------------------------CHECKING ENV VARIABLES
const envVariableError = checkEnvironmentVariable();


// -------------------------MONGO DB CONNECTION
initMongo();

// -------------------------FIREBASE CONNECTION
initFirebase();

// -------------------------MIDDLEWARES
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// -------------------------CORS
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);

// -------------------------ROUTES
app.use("/api/auth/login/", routes.loginRouter);
app.use("/api/auth/signup/", routes.signupRouter);
app.use("/api/auth/google/", routes.googleAuthRouter);

app.use("/api/friends/", routes.getFriendsRouter);
app.use("/api/friend/add/", routes.addFriendRouter);
app.use("/api/friend/remove/", routes.removeFriendRouter);
app.use("/api/friend/block/", routes.blockFriendRouter);
app.use("/api/friend/unblock/", routes.unblockFriendRouter);
app.use("/api/friend/mute/", routes.muteFriendRouter);
app.use("/api/friend/unmute/", routes.unmuteFriendRouter);
app.use("/api/friend/pin/", routes.pinFriendRouter);
app.use("/api/friend/unpin/", routes.unpinFriendRouter);

app.use("/api/messages/", routes.getMessagesRouter);
app.use("/api/messages/message/seen", routes.seenMessageRouter);

app.use("/api/profile/get/", routes.getProfileRouter);
app.use("/api/profile/update/", routes.updateProfileRouter);
app.use("/api/profile/delete/", routes.deleteProfileRouter);
app.use("/api/profile/restore/", routes.restoreProfileRouter);
app.use("/api/profile/change-password/", routes.changePasswordRouter);
app.use("/api/profile/forgot-password/", routes.forgotPasswordRouter);
app.use("/api/profile/set-status/", routes.setStatusRouter);
app.use("/api/profile/update-profile-pic/", routes.updateProfilePicRouter);



// -------------------------API CONNECTION CHECK
app.get("/", (req, res) => {
  res
    .json({ message: "Chit Chat api is runing... ", error: envVariableError })
    .status(200);
});

app.get("/api/", (req, res) => {
  res
    .json({ message: "Chit Chat api is runing... ", error: envVariableError })
    .status(200);
});

// -------------------------SETUP SERVER
const httpServer = http.createServer(app);

// -------------------------------------------SETUP SOCKET.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

//-------------------------------------------SOCKET MIDDLWARES
io.use(authenticateSocketConnection);

//-------------------------------------------SOCKET CONNECTION HANDLER
io.on('connection', (socket) => onSocketConnection(io, socket));

// -------------------------PORT LISTENING
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
