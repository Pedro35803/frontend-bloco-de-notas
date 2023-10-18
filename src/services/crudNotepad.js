import api from "../api"

export const getAllNotepads = async () => {
    const response = await api.get(`/user/me/notepad`);
    const content = await response.data;

    if (response.status !== 200) throw new Error(content.message);

    return await content;
}

export const createNotepad = async ({ title, content }) => {
    const data = { title, content };

    const response = await api.post(`/user/me/notepad`, data);
    const resContent = await response.data;

    console.log(response)

    if (response.statusText !== "OK") throw new Error(resContent.message);

    return await resContent;
}

export const deleteNotepad = async ({ id }) => {
    const response = await api.delete(`/user/me/notepad/${id}`);
    const content = await response.data;

    console.log(response)

    if (response.status !== 403) throw new Error(content.message);

    return await content;
}