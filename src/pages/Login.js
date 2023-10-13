import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import cookie from "cookiejs";
import * as yup from "yup";

import Form from "../components/Form.js";
import Title from "../components/Title.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";

import { login } from "../services/crudUser.js";
import { timeToken } from "../services/timeToken.js";

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
        getValues,
    } = useForm({ resolver: yupResolver(schema) });

    const navigate = useNavigate();

    const callbackLogin = async () => {
        try {
            const { email, password } = getValues();
            const response = await login({ email, password });
            
            if (response.access) {
                const minutesAccessToken = Number(
                    process.env.REACT_APP_ACCESS_TOKEN_DURATION_MINUTES
                );
                const minutesRefreshToken = Number(
                    process.env.REACT_APP_REFRESH_TOKEN_DURATION_MINUTES
                );

                const timeTokenAccess = timeToken(minutesAccessToken);
                const timeTokenRefresh = timeToken(minutesRefreshToken);

                cookie.set('access', response.access, {
                    expires: timeTokenAccess
                });

                cookie.set('refresh', response.refresh, {
                    expires: timeTokenRefresh
                });

                navigate("/main");
            }
        } catch (error) {
            if (error.name === "AxiosError") {
                const { status } = error.response;
                if (status === 401) {
                    setError("email", {
                        type: "customn",
                        message: "Usuário ou senha incorreto",
                    });
                    setError("password", {
                        type: "customn",
                        message: "Usuário ou senha incorreto",
                    });
                }
            }
        }
    };

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
