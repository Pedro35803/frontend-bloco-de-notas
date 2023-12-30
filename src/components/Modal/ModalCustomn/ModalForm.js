import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

import Button from "../../Button";
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
    notepad,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset: resetFields,
    } = useForm({ resolver: yupResolver(schema) });

    useState(() => {
        if (notepad) {
            const { id, title, content } = notepad;
            setValue("content", content);
            setValue("title", title);
            setValue("id", id)
        }
    }, []);

    const submitValues = async (fields) => {
        try {
            const newNotepad = await callbackAction(fields);
            callbackSuccess(newNotepad);
            callbackClose();
            resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            callbackClose={callbackClose}
            resetValues={resetFields}
        >
            <form
                noValidate
                className="form rounded-lg w-[40rem]"
                onSubmit={handleSubmit(submitValues)}
                data-cy="modal-form"
            >
                <Input
                    label="Titulo"
                    error={errors.title}
                    {...register("title")}
                    data-cy="modal-title"
                />
                <Input
                    label="Texto"
                    {...register("content")}
                    data-cy="modal-content"
                />
                <div className="flex gap-4">
                    <Button
                        link="#"
                        isOutline={true}
                        onClick={(event) => {
                            event.preventDefault();
                            callbackClose();
                            resetFields();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button data-cy="modal-action">Enviar</Button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalForm;
