import { api } from "../api.js";

const endpoint = `/user/me/notepads`;

export const getAllNotepads = async () => {
    const response = await api.get(endpoint);
    const content = await response.data;

    if (response.status !== 200) throw new Error(content.message);

    return await content;
};

export const createNotepad = async ({ title, content }) => {
    const data = { title, content };

    const response = await api.post(endpoint, data);
    const resContent = await response.data;

    if (response.statusText !== "OK") throw new Error(resContent.message);

    return await resContent;
};

export const editNotepad = async ({ id, title, content }) => {
    const data = { title, content };

    const response = await api.patch(`${endpoint}/${id}`, data);
    const resContent = await response.data;

    console.log(response);

    if (response.statusText !== "OK") throw new Error(resContent.message);

    return await resContent;
};

export const deleteNotepad = async ({ id }) => {
    const response = await api.delete(`${endpoint}/${id}`);
    const content = await response.data;

    console.log(response);

    if (response.status !== 403) throw new Error(content.message);

    return await content;
};
