import { api, updateToken } from "../api.js";

export const login = async ({ email, password }) => {
    const data = { email, password };

    const response = await api.post(`/login`, data);

    const { token, message } = await response.data;

    if (response.status !== 201) throw new Error(message);

    updateToken(token.access);
    return await token;
};

export const createUser = async ({ name, email, password }) => {
    const data = { name, email, password };

    const response = await api.post(`/register`, data);
    const content = await response.data;

    if (response.status !== 201) throw new Error(content?.message);

    return content;
};
