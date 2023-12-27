import { useState } from "react";

export const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    const ModalForm = (props) => {
        return (
            <ModalForm
                isVisible={isVisible}
                callbackClose={closeModal}
                {...props}
            />
        );
    };
    
    const ModalErrorServer = (props) => {
        return (
            <ModalErrorServer
                isVisible={isVisible}
                callbackClose={closeModal}
                {...props}
            />
        );
    };

    const ModalDelete = (props) => {
        return (
            <ModalDelete
                isVisible={isVisible}
                callbackClose={closeModal}
                {...props}
            />
        );
    };

    const Modal = (props) => {
        return (
            <Modal
                isVisible={isVisible}
                callbackClose={closeModal}
                {...props}
            />
        );
    };

    return {
        ModalErrorServer,
        ModalDelete,
        closeModal,
        ModalForm,
        openModal,
        Modal
    };
};
