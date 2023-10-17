import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

import { createNotepad } from "../services/crudNotepad";

const schema = yup.object({
    title: yup.string().required("É nescessário informar o titulo"),
    content: yup.string(),
});

const Modal = ({ callbackClose, isVisible, addNotepad }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({ resolver: yupResolver(schema) });

    const classVisible = isVisible
        ? "opacity-100 visible"
        : "invisible opacity-0";

    const submitValues = async () => {
        try {
            const { title, content } = getValues();
            const notepad = await createNotepad({ title, content });
            addNotepad(notepad);
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
            submitValues();
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
                onSubmit={handleSubmit(callbackForm)}
            >
                <Input
                    register={register}
                    name="title"
                    label="Titulo"
                    errors={errors}
                />
                <Input
                    register={register}
                    name="content"
                    label="Texto"
                    errors={errors}
                />
                <div className="flex gap-4">
                    <Button isOutline={true}>Cancelar</Button>
                    <Button hasSend>Enviar</Button>
                </div>
            </Form>
        </div>
    );
};

export default Modal;
