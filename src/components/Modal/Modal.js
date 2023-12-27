const Modal = ({
    callbackClose,
    resetValues,
    isVisible,
    children
}) => {

    const classVisible = isVisible
        ? "opacity-100 visible"
        : "invisible opacity-0";

    const onClickPage = (event) => {
        const elementClick = event.target;
        const elementName = elementClick.getAttribute("name");
        if (elementName === "modal-page") {
            callbackClose();
            resetValues && resetValues();
        }
    };

    return (
        <div
            name="modal-page"
            className={`${classVisible} duration-200 ease-linear bg-page_modal fixed inset-0 h-screen flex justify-center items-center transition-modal`}
            onClick={onClickPage}
        >
           {children}
        </div>
    );
};

export default Modal;
