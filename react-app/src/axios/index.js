import axios from 'axios';
import getEnv from '../utils/get-env';

const instance = axios.create({
    baseURL: getEnv.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // SESSION COCKIES PASSED
});

//-----------PASSING TOKEN IN HEADER---------------- 
// uncomment below code to pass token in header if session is not working

instance.interceptors.request.use(
    async (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;