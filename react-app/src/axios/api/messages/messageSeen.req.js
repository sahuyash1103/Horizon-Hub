import instance from "./../../index";

export const MarkSeenMessage = async (messageId) => {
    try {
        const response = await instance.get(`/messages/message/set/seen/${messageId}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
