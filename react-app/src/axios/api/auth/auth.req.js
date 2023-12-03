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

export const googleAuth = () => {
    return `${instance.getUri()}/auth/google`;
};

export const githubAuth = () => {
    return `${instance.getUri()}/auth/github`;
};

export const logout = async () => {
    try {
        const response = await instance.get("/auth/logout");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const testAPI = async () => {
    try {
        const response = await instance.get("/");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};