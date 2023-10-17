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

    if (response.statusText !== "OK") throw new Error(content.message);

    return await resContent;
}