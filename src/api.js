import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const api = axios.create({ baseURL });

export const updateToken = (token) =>
    (api.defaults.headers.common.Authorization = `Bearer ${token}`);
