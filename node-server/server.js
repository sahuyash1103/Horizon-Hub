//-------------------------IMPORTS
const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const morgan = require('morgan')
const passport = require("passport");
const expressSession = require("express-session");

const routes = require("./src/routes/index");

const { PORT, SESSION_SECRET, APP_1_URL } = require("./src/utils/get-env");
const { checkEnvironmentVariable } = require("./src/utils/check_env_var");
const { initMongo } = require("./src/mongo/index");
const { initFirebase } = require("./src/firebase/index");
const { onSocketConnection } = require("./src/socket");
const authSocketMW = require("./src/middlewares/socket-auth.middleware");

require("./src/passport/index");
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
app.use(expressSession(
  {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60 * 60 * 24 * 1000 }
  }
));
app.use(passport.initialize());
app.use(passport.session());


// -------------------------CORS
app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: ["http://localhost:3000", APP_1_URL],
    methods: "*",
  })
);
//--------------------------SETUP HEADER
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', "*");
  next();
});

// -------------------------ROUTES
app.use("/api/auth/login/", routes.loginRouter);
app.use("/api/auth/signup/", routes.signupRouter);
app.use("/api/auth/google/", routes.googleAuthRouter);
app.use("/api/auth/github/", routes.githubAuthRouter);
app.use("/api/auth/logout/", routes.logoutRouter);

app.use("/api/friends/", routes.getFriendsRouter);
app.use("/api/friends/friend/add/", routes.addFriendRouter);
app.use("/api/friends/friend/remove/", routes.removeFriendRouter);
app.use("/api/friends/friend/block/", routes.blockFriendRouter);
app.use("/api/friends/friend/unblock/", routes.unblockFriendRouter);
app.use("/api/friends/friend/mute/", routes.muteFriendRouter);
app.use("/api/friends/friend/unmute/", routes.unmuteFriendRouter);
app.use("/api/friends/friend/pin/", routes.pinFriendRouter);
app.use("/api/friends/friend/unpin/", routes.unpinFriendRouter);

app.use("/api/group/get", routes.getGroupRouter);
app.use("/api/group/create", routes.createGroupRouter);
app.use("/api/group/delete", routes.deleteGroupRouter);
app.use("/api/group/update", routes.updateGroupRouter);
app.use("/api/group/add-member", routes.addMemberRouter);
app.use("/api/group/remove-member", routes.removeMemberRouter);
app.use("/api/group/update-profile-pic", routes.updateGroupProfilePicRouter);
app.use("/api/group/change-admin", routes.changeAdminRouter);
app.use("/api/group/leave", routes.leaveGroupRouter)

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
    optionsSuccessStatus: 200,
    credentials: true,
    origin: ["http://localhost:3000", APP_1_URL],
    methods: "*",
  }
});

//-------------------------------------------SOCKET MIDDLWARES
io.use(authSocketMW);

//-------------------------------------------SOCKET CONNECTION HANDLER
io.on('connection', (socket) => onSocketConnection(io, socket));

// -------------------------PORT LISTENING
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
