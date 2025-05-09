import {createBrowserRouter} from "react-router";
import App from "@/app/App";
import AuthPage from "@/features/auth/AuthPage.tsx";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {path: '/auth', element: <AuthPage/>}
        ]
    }
]);

export default router;