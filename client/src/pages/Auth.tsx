import AuthLayout from "@/layouts/AuthLayout.tsx";
import {Outlet} from "react-router";

const Auth = () => {
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    )
}
export default Auth
