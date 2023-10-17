import axios from "axios";

import { refreshToken } from "./services/refreshToken";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
} from "./services/cookiesHandle";

const baseURL = process.env.REACT_APP_API_URL;

const accessToken = async () => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access && refresh) {
        const response = await refreshToken({ refresh });
        setAccessToken(response)
        return response;
    }

    return access;
};

const access = await accessToken();

const contentType = { "Content-Type": "application/json" };
const headers = access
    ? { Authorization: `Bearer ${access}`, ...contentType }
    : contentType;

const api = axios.create({ baseURL, headers });

export default api;
