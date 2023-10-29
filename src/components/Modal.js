import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import { useState } from "react";

const schema = yup.object({
    title: yup.string().required("É nescessário informar o titulo"),
    content: yup.string(),
});

const Modal = ({
    callbackClose,
    isVisible,
    callbackSuccess,
    callbackAction,
    callbackGetNotepad,
    notepadId,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    console.log(notepadId)

    const classVisible = isVisible
        ? "opacity-100 visible"
        : "invisible opacity-0";

    useState(() => {
        if (notepadId) {
            const { title, content } = callbackGetNotepad(notepadId);
            setValue("content", content);
            setValue("title", title);
        }
    }, []);

    const submitValues = async () => {
        try {
            const { title, content } = getValues();
            const notepad = await callbackAction({ title, content });
            callbackSuccess(await notepad);
            callbackClose();
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const onClickPage = (event) => {
        const elementClick = event.target;
        const elementName = elementClick.getAttribute("name");
        if (elementName === "modal-page") {
            callbackClose();
            reset();
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
                onSubmit={handleSubmit(submitValues)}
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
                    <Button
                        link="#"
                        isOutline={true}
                        onClick={(event) => {
                            event.preventDefault();
                            callbackClose();
                            reset();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button>Enviar</Button>
                </div>
            </Form>
        </div>
    );
};

export default Modal;
