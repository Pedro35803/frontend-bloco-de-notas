import axios from "axios";
import cookie from "cookiejs";

import { refreshToken } from "./services/refreshToken";
import { timeToken } from "./services/timeToken"

const baseURL = process.env.REACT_APP_API_URL;

const getAccessToken = async () => {
    const access = cookie.get("access");
    const refresh = cookie.get("refresh");

    if (!access && refresh) {
        const response = await refreshToken({ refresh });

        const minutesAccessToken = Number(
            process.env.REACT_APP_ACCESS_TOKEN_DURATION_MINUTES
        );

        const timeTokenAccess = timeToken(minutesAccessToken);

        cookie.set('refresh', response.refresh, {
            expires: timeTokenAccess
        });
        return ;
    }

    return access;
};

const access = await getAccessToken();
console.log(access)

const contentType = { "Content-Type": "application/json" };
const headers = access
    ? { Authorization: `Bearer ${access}`, ...contentType }
    : contentType;

const api = axios.create({ baseURL, headers });

export default api;
