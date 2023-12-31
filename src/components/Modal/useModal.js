import React, { useState } from "react";

export const useModal = ({ modal: ModalComponent }) => {
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    const Modal = (props) => {
        return (
            <ModalComponent isVisible={isVisible} callbackClose={closeModal} {...props} />
        );
    };

    return {
        closeModal,
        openModal,
        Modal,
    };
};
