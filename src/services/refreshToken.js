import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL });

export const refreshToken = async ({ refresh }) => {
    console.log(refresh)
    const response = await api.post("/refresh-token", { refresh })
    const content = await response.data
    console.log(content)

    if (response.status !== 201) throw new Error(content.message)

    return await content.access
}