import { createAxiosInstance } from "../api.js";
import { getRefreshToken } from "./cookiesHandle.js";

export const refreshToken = async ({ refresh }) => {
    const token = getRefreshToken()
    const api = createAxiosInstance(token);

    const response = await api.post("/refresh-token", { refresh });
    const content = await response.data;

    if (response.status !== 201) throw new Error(content.message);

    return await content.access;
};
