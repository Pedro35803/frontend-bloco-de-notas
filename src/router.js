import { Navigate, createBrowserRouter } from "react-router-dom";

import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

const isLogin = () => false;

const router = createBrowserRouter([
    {
        path: "/",
        element: isLogin() ? <Main /> : <Navigate to="/login" />,
    },
    {
        path: "/login",
        element: isLogin() ? <Navigate to="/" /> : <Login />,
    },
    {
        path: "/register",
        element: isLogin() ? <Navigate to="/" /> : <Register />,
    },
]);

export default router;