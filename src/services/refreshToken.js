import { api, updateToken } from "../api.js";
import { getRefreshToken } from "./cookiesHandle.js";

export const refreshToken = async () => {
    try {
        const refresh = getRefreshToken();
        updateToken(refresh);
        
        const response = await api.post("/refresh-token", { refresh });
        const { access, message } = await response.data;

        if (response.status !== 201) throw new Error(message);

        updateToken(access);
        return await access;
    } catch {
        alert("Ocorreu um error, a pagina será recarregada");
        window.location.reload();
    }
};
