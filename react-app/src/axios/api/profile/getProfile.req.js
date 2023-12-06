import instance from "./../../index";

export const getProfile = async () => {
    try {
        const response = await instance.get("/profile/get");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
