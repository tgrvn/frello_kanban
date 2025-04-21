import {Link} from "react-router";
import {routes} from "@/shared/constants/routes.ts";
import PrimaryCheckbox from "@/shared/components/PrimaryCheckbox.tsx";
import PrimaryInput from "@/shared/components/PrimaryInput.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import SocialLogin from "@/features/auth/components/SocialLogin.tsx";

const RegisterForm = () => {
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

                <PrimaryInput id={"password"} placeholder={"••••••••••••••"}>
                    Repeat password
                </PrimaryInput>

                <PrimaryCheckbox id={"accepted_terms"}>
                    Accept the <Link className={"text-blue-500 underline font-semibold"} to={routes.TERMS}>terms and
                    conditions</Link>
                </PrimaryCheckbox>

                <div className={"text-sm"}>
                    Already have an account? {" "}
                    <Link className={"text-blue-500 underline"} to={routes.LOGIN}>
                        Log In
                    </Link>
                </div>

                <Button className={"mt-3"}>Sign up</Button>
            </div>

            <SocialLogin/>
        </div>
    )
}
export default RegisterForm
