import { api } from "../api.js";

const endpoint = `/user/me/notepads`;

export const getAllNotepads = async () => {
    const response = await api.get(endpoint);
    const content = await response.data;
    return await content;
};

export const createNotepad = async ({ title, content }) => {
    const data = { title, content };

    const response = await api.post(endpoint, data, {
        validateStatus: (status) => status === 201,
    });
    const resContent = await response.data;

    return await resContent;
};

export const editNotepad = async ({ id, title, content }) => {
    const data = { title, content };

    const response = await api.patch(`${endpoint}/${id}`, data, {
        validateStatus: (status) => status === 203,
    });
    const resContent = await response.data;

    return await resContent;
};

export const deleteNotepad = async ({ id }) => {
    const response = await api.delete(`${endpoint}/${id}`, {
        validateStatus: (status) => status === 204,
    });
    return await response;
};
