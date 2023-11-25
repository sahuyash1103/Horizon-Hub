import instance from "../../index";

export const getProfile = async () => {
    try {
        const response = await instance.get("/");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};


export const signup = async (name, phone, email, password) => {
    try {
        const response = await instance.post("/auth/signup", {
            name,
            phone,
            email,
            password,
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};