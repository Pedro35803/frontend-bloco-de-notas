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
            console.log(email, password)
            const user = login({ email, password });
        } catch (error) {
            const field = error.field || "email";
            // setError(field, { type: "customn", message: error.message });
        }
    };

    return (
        <main className="h-screen elem-center">
            <div className="space-y-9 max-w-[40rem] w-full">
                <Title text="Login" />
                <Form onSubmit={handleSubmit(callbackLogin)}>
                    <div className="space-y-4">
                        <h1 class="text-xl">{"props.label"}</h1>
                        <input type="text" />
                        {errors.email ? <p className="text-tertiary">{ errors.email.message }</p> : null}
                    </div>
                    {/* <Input
                        type="email"
                        max="125"
                        label="E-mail"
                        {...register("email")}
                        error={errors.email}
                        data-cy="login-email"
                    /> */}
                    <Input
                        type="password"
                        max="525"
                        label="Senha"
                        {...register("password")}
                        error={errors.password}
                        data-cy="login-password"
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
