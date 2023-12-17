import instance from "./../../index";

export const sendMessageImage = async (messageId, image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await instance.get(`/messages/message/send/file/image/${messageId}`, formData, {
            Headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const sendMessageDoc = async (messageId, doc) => {
    try {
        const formData = new FormData();
        formData.append("doc", doc);
        const response = await instance.get(`/messages/message/send/file/doc/${messageId}`, formData, {
            "Content-Type": "multipart/form-data"
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
