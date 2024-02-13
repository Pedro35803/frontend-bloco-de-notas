import axios from "axios";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
} from "./services/cookiesHandle";

const baseURL = process.env.REACT_APP_API_URL;

export const api = axios.create({ baseURL });

export const updateToken = (token) => {
    const string = `Bearer ${token}`;
    api.defaults.headers.common.Authorization = string;
    return api.defaults.headers.common;
};

const handleRequest = async (config) => {
    const access = getAccessToken();
    const refresh = getRefreshToken();
    if (!access && refresh) {
        const token = await refreshToken();
        setAccessToken(token);
        config.headers = Object.assign({}, config.headers, updateToken(token));
    }
    return config;
};

const refreshToken = async () => {
    try {
        const refresh = getRefreshToken();
        const response = await axios.post(`${baseURL}/refresh-token`, {
            refresh,
        });

        const { access, message } = await response.data;

        if (response.status !== 201) throw new Error(message);
        return await access;
    } catch (error) {
        console.error(error);
    }
};

api.interceptors.request.use(handleRequest, null);
