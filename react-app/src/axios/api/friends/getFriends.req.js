import instance from "./../../index";

export const getFriends = async () => {
    try {
        const response = await instance.get("/friends");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};


export const getFriend = async (email) => {
    try {
        const response = await instance.get(`/friends/friend/${email}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};