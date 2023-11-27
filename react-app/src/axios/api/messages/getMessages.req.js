import instance from "../../index";

export const getMessages = async () => {
    try {
        const response = await instance.get(`/messages/`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};