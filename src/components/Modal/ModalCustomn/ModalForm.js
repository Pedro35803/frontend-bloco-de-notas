import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

import Button from "../../Button";
import Form from "../../Form";
import Input from "../../Input";
import Modal from "../Modal";

const schema = yup.object({
    title: yup.string().required("É nescessário informar o titulo"),
    content: yup.string(),
});

const ModalForm = ({
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

    return (
        <Modal isVisible={isVisible} callbackClose={callbackClose} resetValues={reset}>
            <Form
                className="rounded-lg w-[40rem]"
                onSubmit={handleSubmit(submitValues)}
            >
                <Input
                    label="Titulo"
                    errors={errors}
                    register={register}
                    data-cy="modal-title"
                />
                <Input
                    label="Texto"
                    register={register}
                    data-cy="modal-content"
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
                    <Button data-cy="modal-action">Enviar</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalForm;
