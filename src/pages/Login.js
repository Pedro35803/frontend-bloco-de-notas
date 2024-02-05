import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../components/Input.js";
import Button from "../components/Button.js";

import { login } from "../services/crudUser.js";
import { setAccessToken, setRefreshToken } from "../services/cookiesHandle.js";

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
        setError,
    } = useForm({ resolver: yupResolver(schema) });

    const callbackLogin = async (fields) => {
        try {
            const response = await login(fields);

            if (response.access) {
                setAccessToken(response.access);
                setRefreshToken(response.refresh);
                window.location.reload()
            }
        } catch (error) {
            if (error.name === "AxiosError") {
                const { status } = error.response;
                if (status === 401) {
                    const config = {
                        type: "customn",
                        message: "Usuário ou senha incorreto",
                    };
                    setError("email", config);
                    setError("password", config);
                }
            }
        }
    };

    return (
        <main className="h-screen elem-center">
            <div className="space-y-9 max-w-[40rem] w-full">
                <h1 className="title">Login</h1>
                <form
                    noValidate
                    className="form"
                    onSubmit={handleSubmit(callbackLogin)}
                >
                    <Input
                        max="125"
                        type="email"
                        label="E-mail"
                        data-cy="login-email"
                        error={errors.email}
                        {...register("email")}
                    />

                    <Input
                        max="125"
                        label="Senha"
                        type="password"
                        data-cy="login-password"
                        error={errors.password}
                        {...register("password")}
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
                </form>
            </div>
        </main>
    );
};

export default Login;
