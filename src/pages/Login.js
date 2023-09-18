import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "../components/Form.js";
import Title from "../components/Title.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";

import { login } from "../services/crudUser.js";

const schema = yup.object({
    email: yup
        .string()
        .email("Digite um email valido")
        .required("É nescessário informar um email"),
    password: yup.string().required("É nescessário informar a senha"),
});

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
        getValues,
    } = useForm({ resolver: yupResolver(schema) });

    const callbackLogin = () => {
        try {
            const { email, password } = getValues();
            console.log(email, password);
            // const user = login({ email, password });
        } catch (error) {
            const field = error.field || "email";
            // setError(field, { type: "customn", message: error.message });
        }
    };

    const classInput = "h-[3.125rem] w-full bg-primary px-4 rounded-lg";

    return (
        <main className="h-screen elem-center">
            <div className="space-y-9 max-w-[40rem] w-full">
                <Title text="Login" />
                <Form onSubmit={handleSubmit(callbackLogin)}>
                    <Input
                        type="email"
                        name="email"
                        max="125"
                        label="E-mail"
                        data-cy="login-email"
                        errors={errors}
                        register={register}
                    />

                    <Input
                        type="password"
                        name="password"
                        max="125"
                        label="Senha"
                        data-cy="login-password"
                        errors={errors}
                        register={register}
                    />

                    <div className="flex justify-content gap-4">
                        <Button
                            isOutline={true}
                            link="/register"
                            data-cy="login-redirect_register"
                        >
                            Cadastro
                        </Button>
                        <Button data-cy="login-save">Entrar</Button>
                    </div>
                </Form>
            </div>
        </main>
    );
};

export default Login;
