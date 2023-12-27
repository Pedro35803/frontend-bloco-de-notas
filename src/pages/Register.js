import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import Input from "../components/Input.js";
import Button from "../components/Button.js";

import { createUser } from "../services/crudUser.js";

import ModalServerError from "../components/Modal/ModalCustomn/ModalServerError.js";
import { useModal } from "../components/Modal/useModal.js";

const schema = yup.object({
    name: yup.string().required("É nescessário informar seu nome"),
    email: yup
        .string()
        .required("É nescessário informar um email")
        .email("Digite um email valido"),
    password: yup.string().required("Informe uma senha segura"),
    password_confirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
        .required("Confirme a senha"),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({ resolver: yupResolver(schema) });

    const navigate = useNavigate();

    const { Modal, openModal } = useModal({ modal: ModalServerError });

    const callbackRegister = async () => {
        try {
            const { name, email, password, password_confirm } = getValues();
            if (password === password_confirm) {
                const user = await createUser({ name, email, password });
                if (user.id) {
                    navigate("/login");
                }
            }
        } catch (error) {
            if (error.message === "Network Error") {
                openModal();
            } else if (error.name === "AxiosError") {
                const { data, status } = error.response;
                if (status === 409) {
                    const field = data.field;
                    setError(field, { type: "customn", message: data.message });
                }
            }
        }
    };

    return (
        <>
            <main className="h-screen elem-center">
                <div className="space-y-9 max-w-[40rem] w-full">
                    <h1 className="title">Cadastro</h1>
                    <form className="form" noValidate onSubmit={handleSubmit(callbackRegister)}>
                        <Input
                            type="name"
                            max="125"
                            label="Nome"
                            error={errors.name}
                            {...register("name")}
                            data-cy="register-name"
                        />
                        <Input
                            type="email"
                            max="125"
                            label="E-mail"
                            error={errors.email}
                            {...register("email")}
                            data-cy="register-email"
                        />
                        <Input
                            type="password"
                            max="525"
                            label="Senha"
                            error={errors.password}
                            {...register("password")}
                            data-cy="register-password"
                        />
                        <Input
                            type="password"
                            max="525"
                            label="Confirme a Senha"
                            error={errors.password_confirm}
                            {...register(".password_confirm")}
                            data-cy="register-password_confirm"
                        />
                        <div className="flex justify-content gap-4">
                            <Button
                                isOutline={true}
                                link="/login"
                                data-cy="reister-redirect_login"
                            >
                                Login
                            </Button>
                            <Button data-cy="register-save">Registrar</Button>
                        </div>
                    </form>
                </div>
            </main>
            <Modal />
        </>
    );
};

export default Register;
