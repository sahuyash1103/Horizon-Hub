import instance from "../../index";

export const login = async (email, password) => {
    try {
        const response = await instance.post("/auth/login", {
            email,
            password,
        });
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