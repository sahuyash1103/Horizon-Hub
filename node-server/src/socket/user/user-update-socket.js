const User = require("../../mongo/schema/userSchema");
const { validateUserRealTimeUpdateData } = require("../../utils/validators");

export const userUpdates = (socket, io) => {
    socket.on("user-update", async (data) => {
        const user = await User.findById(socket.user._id).populate("friends.friend");
        if (!user)
            return socket.emit("error", { message: "User not found" });

        const updates = data.updates;
        const error = await validateUserRealTimeUpdateData(updates);
        if (error) return socket.emit("error", { message: error.message });

        user.friends.forEach((friend) => {
            socket.to(friend.friend.email).emit("friend-update", updates)
        });
    });
}