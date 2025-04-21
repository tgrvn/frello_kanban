import PrimaryInput from "@/shared/components/PrimaryInput.tsx";
import {Link} from "react-router";
import {routes} from "@/shared/constants/routes.ts";
import {Button} from "@/shared/components/ui/button.tsx";

const ForgotPassword = () => {
    return (
        <div>
            <h5 className={"text-center"}>Can't log in?</h5>
            <div className={"flex flex-col gap-4 mt-3"}>
                <PrimaryInput id={"email"} placeholder={"email@example.com"}>
                    We will send a recovery link to the email address:
                </PrimaryInput>

                <Button className={"mt-3"}>Send a recovery link</Button>

                <Link className={"text-sm text-center text-blue-500 underline"} to={routes.LOGIN}>
                    Back to Log In
                </Link>
            </div>
        </div>
    )
}
export default ForgotPassword
