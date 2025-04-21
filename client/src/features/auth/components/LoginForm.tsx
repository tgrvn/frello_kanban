import {Button} from "@/shared/components/ui/button.tsx";
import {Link} from "react-router";
import {routes} from "@/shared/constants/routes.ts";
import PrimaryInput from "@/shared/components/PrimaryInput.tsx";
import PrimaryCheckbox from "@/shared/components/PrimaryCheckbox.tsx";
import SocialLogin from "@/features/auth/components/SocialLogin.tsx";

const LoginForm = () => {
    return (
        <div>
            <p className={"text-center"}>Log in to the application</p>

            <div className={"flex flex-col gap-4 mt-3"}>
                <PrimaryInput id={"email"} placeholder={"email@example.com"}>
                    Email
                </PrimaryInput>

                <PrimaryInput id={"password"} placeholder={"••••••••••••••"}>
                    Password
                </PrimaryInput>

                <PrimaryCheckbox id={"remember"}>
                    Remember me
                </PrimaryCheckbox>


                <div className={"flex justify-between gap-2 items-center text-sm"}>
                    <Link className={"text-blue-500 underline"} to={routes.FORGOT_PASSWORD}>
                        Forgot password?
                    </Link>

                    <Link className={"text-blue-500 underline"} to={routes.REGISTER}>
                        Create an account
                    </Link>
                </div>

                <Button className={"mt-3"}>Log In</Button>
            </div>

            <SocialLogin/>
        </div>
    )
}
export default LoginForm
