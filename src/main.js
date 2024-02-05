import { useEffect } from "react";

import ModalServerError from "./components/Modal/ModalCustomn/ModalServerError.js";
import { useModal } from "./components/Modal/useModal.js";

import translator from "./translator.js";
import Router from "./router.js";
import { api } from "./api";

const App = () => {
    const { Modal: ModalError, openModal } = useModal({
        modal: ModalServerError,
    });

    const handleError = (error) => {
        if (error?.code === "ERR_NETWORK") {
            openModal();
        }
        const objError = { ...error };
        const { message } = error.response.data;
        objError.response.data.message = translator[message];
        return Promise.reject(objError);
    };

    useEffect(() => {
        api.interceptors.response.use(null, handleError);
    }, []);

    return (
        <>
            <Router />
            <ModalError />
        </>
    );
};

export default App;
