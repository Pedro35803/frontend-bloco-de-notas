import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "../components/Form.js";
import Title from "../components/Title.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";

import { createUser } from "../services/crudUser.js";
import { useNavigate } from "react-router-dom";

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
            if (error.name === "AxiosError") {
                const { data, status } = error.response
                if (status === 409) {
                    const field = data.field;
                    setError(field, { type: "customn", message: data.message });
                }
            }
        }
    };

    return (
        <main className="h-screen elem-center">
            <div className="space-y-9 max-w-[40rem] w-full">
                <Title text="Cadastro" />
                <Form onSubmit={handleSubmit(callbackRegister)}>
                    <Input
                        type="name"
                        name="name"
                        max="125"
                        label="Nome"
                        register={register}
                        errors={errors}
                        data-cy="register-name"
                    />
                    <Input
                        type="email"
                        name="email"
                        max="125"
                        label="E-mail"
                        register={register}
                        errors={errors}
                        data-cy="register-email"
                    />
                    <Input
                        type="password"
                        name="password"
                        max="525"
                        label="Senha"
                        register={register}
                        errors={errors}
                        data-cy="register-password"
                    />
                    <Input
                        type="password"
                        name="password_confirm"
                        max="525"
                        label="Confirme a Senha"
                        register={register}
                        errors={errors}
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
                </Form>
            </div>
        </main>
    );
};

export default Register;
