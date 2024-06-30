import instance from "./../../index";

export const addFriend = async (email, _id = null, { isAnonymous }) => {
    try {
        const response = await instance.put("/friends/friend/add", {
            friend_data: { email, _id, isAnonymous },
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};


export const removeFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/remove", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const blockFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/block", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const unblockFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/unblock", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const muteFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/mute", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const unmuteFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/unmute", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const pinFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/pin", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const unpinFriend = async (email) => {
    try {
        const response = await instance.delete("/friends/friend/unpin", {
            friend_data: { email }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
