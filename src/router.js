import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

import { refreshToken } from "./services/refreshToken.js";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
} from "./services/cookiesHandle.js";
import React, { useEffect } from "react";
import { updateToken } from "./api.js";

const publicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

const privateRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
]);

const Router = () => {
    const refresh = getRefreshToken();

    useEffect(() => {
        const refreshAccess = async () => {
            const token = await refreshToken();
            setAccessToken(token);
        };

        const access = getAccessToken();
        access ? updateToken(access) : refreshAccess(access);
    }, []);

    return <RouterProvider router={refresh ? privateRoutes : publicRoutes} />;
};

export default Router;
