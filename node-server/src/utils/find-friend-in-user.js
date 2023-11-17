
const findFriendInUserSubCollection = async (user, friendId) => {
    const friend = user.friends.find(f => f.friend.toString() === friendId.toString());
    if (friend) return { friend, collection: "friends", subMessage: "friend list" };
    const blockedFriend = user.blockedFriends.find(f => f.friend.toString() === friendId.toString());
    if (blockedFriend) return { friend: blockedFriend, collection: "blockedFriends", subMessage: "block list" };
    const mutedFriend = user.mutedFriends.find(f => f.friend.toString() === friendId.toString());
    if (mutedFriend) return { friend: mutedFriend, collection: "mutedFriends", subMessage: "muted" };
    const pinnedFriend = user.pinnedFriends.find(f => f.friend.toString() === friendId.toString());
    if (pinnedFriend) return { friend: pinnedFriend, collection: "pinnedFriends", subMessage: "pinned" };
    // const unknownFriend = user.unknownFriends.find(f => f.friend.toString() === friendId.toString());
    // if (unknownFriend) return { friend: unknownFriend, collection: "unknownFriends", subMessage: "unknown list" };
    return null;
};

module.exports = findFriendInUserSubCollection;