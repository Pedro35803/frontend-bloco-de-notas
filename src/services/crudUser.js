import api from "../api.js";

export const login = async ({ email, password }) => {
    const data = { email, password };

    const response = await api.post(`/login`, data);
    const content = await response.data;

    if (response.status !== 201) throw new Error(content.message);

    return await content.token;
};

export const createUser = async ({ name, email, password }) => {
    const data = { name, email, password };

    const response = await api.post(`/register`, data);
    const content = await response.data;

    if (response.status !== 201) throw new Error(content?.message);

    return content;
};
