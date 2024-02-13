import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

import { getRefreshToken } from "./services/cookiesHandle.js";
import React from "react";

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
    {
        path: "/*",
        element: <Navigate to="/login" />,
    },
]);

const privateRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/*",
        element: <Navigate to="/" />,
    },
]);

const Router = () => {
    const refresh = getRefreshToken();
    return <RouterProvider router={refresh ? privateRoutes : publicRoutes} />;
};

export default Router;
