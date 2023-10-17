import Button from "./Button";
import Form from "./Form";

const Modal = ({ callbackClose, isVisible }) => {
    const classVisible = isVisible ? "opacity-100 visible" : "invisible opacity-0";

    const callbackForm = (event) => {
        event.preventDefault();
        const buttonPress = event.nativeEvent.submitter;
        const buttonSend = buttonPress.getAttribute("send");
        if (buttonSend === "send") {
            console.log("oi");
        } else {
            callbackClose();
        }
    };

    const onClickPage = (event) => {
        const elementClick = event.target
        const elementName = elementClick.getAttribute("name");
        if (elementName === "modal-page") {
            callbackClose()
        }
    }

    return (
        <div
            name="modal-page"
            className={`${classVisible} duration-200 ease-linear bg-page_modal fixed inset-0 h-screen flex justify-center items-center transition-modal`}
            onClick={onClickPage}
        >
            <Form className="rounded-lg w-[40rem]" onSubmit={callbackForm}>
                <div class="space-y-4">
                    <h1 class="text-xl">Titulo</h1>
                    <input
                        type="text"
                        id="editTitle"
                        max="125"
                        required
                        class="h-[3.125rem] w-full bg-primary px-4 rounded-lg"
                    />
                </div>
                <div class="space-y-4">
                    <h1 class="text-xl">Texto</h1>
                    <input
                        type="text"
                        id="editContent"
                        max="525"
                        required
                        class="h-[3.125rem] w-full bg-primary px-4 rounded-lg"
                    />
                </div>
                <div class="flex gap-4">
                    <Button isOutline={true}>Cancelar</Button>
                    <Button hasSend>Enviar</Button>
                </div>
            </Form>
        </div>
    );
};

export default Modal;
