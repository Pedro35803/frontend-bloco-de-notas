import Button from "./Button";
import Form from "./Form";

import { deleteNotepad } from "../services/crudNotepad";

const ModalDelete = ({ callbackClose, isVisible, callbackSuccess, idNotepad }) => {
    const classVisible = isVisible
        ? "opacity-100 visible"
        : "invisible opacity-0";

    const onClickDelete = async () => {
        try {
            await deleteNotepad({ id: idNotepad });
            callbackSuccess();
            callbackClose();
        } catch (error) {
            console.error(error);
        }
    };

    const callbackForm = (a, event) => {
        event.preventDefault();
        const buttonPress = event.nativeEvent.submitter;
        const buttonSend = buttonPress.getAttribute("send");
        if (buttonSend === "send") {
            onClickDelete();
        } else {
            callbackClose();
        }
    };

    const onClickPage = (event) => {
        const elementClick = event.target;
        const elementName = elementClick.getAttribute("name");
        if (elementName === "modal-page") {
            callbackClose();
        }
    };

    return (
        <div
            name="modal-page"
            className={`${classVisible} duration-200 ease-linear bg-page_modal fixed inset-0 h-screen flex justify-center items-center transition-modal`}
            onClick={onClickPage}
        >
            <Form
                className="rounded-lg w-[40rem]"
                onSubmit={callbackForm}
            >
                <p>Deseja mesmo excluir essa </p>
                <div className="flex gap-4">
                    <Button isOutline={true}>Cancelar</Button>
                    <Button hasSend>Excluir</Button>
                </div>
            </Form>
        </div>
    );
};

export default ModalDelete;
