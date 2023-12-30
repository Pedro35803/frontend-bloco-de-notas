import Button from "../../Button";
import Modal from "../Modal";

const ModalDelete = ({
    callbackClose,
    isVisible,
    notepadId,
    callbackSuccess,
    callbackAction,
}) => {
    const onClickDelete = async () => {
        try {
            await callbackAction(notepadId);
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

    return (
        <Modal isVisible={isVisible} callbackClose={callbackClose}>
            <form noValidate className="form rounded-lg w-[40rem]" onSubmit={callbackForm}>
                <h1 className="text-xl">Deseja mesmo excluir essa anotação?</h1>
                <div className="flex gap-4">
                    <Button isOutline={true}>Cancelar</Button>
                    <Button hasSend>Excluir</Button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalDelete;
