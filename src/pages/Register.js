import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "../components/Form.js";
import Title from "../components/Title.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";

import { createUser } from "../services/crudUser.js"

const schema = yup.object({
    name: yup.string().required("É nescessário informar seu nome"),
    email: yup.string().required("É nescessário informar um email").email("Digite um email valido"),
    password: yup.string().required("Informe uma senha segura"),
    password_confirm: yup.string().oneOf([yup.ref('password'), null], "As senhas devem ser iguais").required("Confirme a senha"),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({ resolver: yupResolver(schema) });

    const callbackRegister = () => {
        try {
            const { name, email, password, password_confirm } = getValues();
            const user = createUser({ name, email, password, password_confirm })
        } catch (error) {
            const field = error.field || "email";
            setError(field, { type: "customn", message: error.message })
        }
    }

    return (
        <main className="h-screen elem-center">
            <div className="space-y-9 max-w-[40rem] w-full">
                <Title text="Cadastro" />
                <Form onSubmit={handleSubmit(callbackRegister)}>
                    <Input
                        type="name"
                        max="125"
                        label="Nome"
                        {...register('name')}
                        error={errors.name}
                        data-cy="register-name"
                    />
                    <Input
                        type="email"
                        max="125"
                        label="E-mail"
                        {...register('email')}
                        error={errors.email}
                        data-cy="register-email"
                    />
                    <Input
                        type="password"
                        max="525"
                        label="Senha"
                        {...register('password')}
                        error={errors.password}
                        data-cy="register-password"

                    />
                    <Input
                        type="password"
                        max="525"
                        label="Confirme a Senha"
                        {...register('password_confirm')}
                        error={errors.password_confirm}
                        data-cy="register-password_confirm"
                    />
                    <div className="flex justify-content gap-4">
                        <Button
                            isOutline={true}
                            link="/login"
                            data-cy="login-redirect_login"
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
