import {createBrowserRouter, redirect} from "react-router";
import App from "@/app/App.tsx";
import Home from "@/pages/Home.tsx";
import LoginForm from "@/features/auth/components/LoginForm.tsx";
import RegisterForm from "@/features/auth/components/RegisterForm.tsx";
import Auth from "@/pages/Auth.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import NotFound from "@/pages/NotFound.tsx";
import {useUserStore} from "@/features/auth/store.ts";
import {routes} from "@/shared/constants/routes.ts";
import ForgotPassword from "@/features/auth/components/ForgotPassword.tsx";

const authRoutes = [
    {path: routes.DASHBOARD, Component: Dashboard}
];

const publicRoutes = [
    {path: routes.LOGIN, Component: LoginForm},
    {path: routes.REGISTER, Component: RegisterForm},
    {path: routes.FORGOT_PASSWORD, Component: ForgotPassword},
];

export const router = createBrowserRouter(
    [
        {
            Component: App,
            children: [
                {
                    path: "/",
                    Component: Home
                },
                {
                    Component: Auth,
                    loader: () => loaderGuard("user"),
                    children: authRoutes
                },
                {
                    Component: Auth,
                    loader: () => loaderGuard("guest"),
                    children: publicRoutes
                }
            ]
        },
        {
            path: '*',
            Component: NotFound
        }
    ]
);

//???
function loaderGuard(mode: "user" | "guest") {
    const isAuth = useUserStore.getState().isAuth;

    if (mode === "guest") {
        if (isAuth) return redirect("/dashboard");
    }

    if (mode === "user") {
        if (!isAuth) return redirect("/login");
    }

    return null;
}