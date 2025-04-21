import {Button} from "@/shared/components/ui/button.tsx";
import {Link} from "react-router";
import {routes} from "@/shared/constants/routes.ts";
import {FaGoogle} from "react-icons/fa6";

const SocialLogin = () => {
    return (
        <div>
            <hr className={"my-4"}/>
            <p className={"text-gray-500 font-semibold text-center mb-4"}>Or log in
                with:</p>

            <Button variant={"outline"} className={"w-full"} asChild>
                <Link to={routes.LOGIN}>
                    <FaGoogle/>
                    Google
                </Link>
            </Button>
        </div>
    )
}
export default SocialLogin;
