import {Button} from "@/shared/components/ui/button.tsx";
import {Link} from "react-router";
import {routes} from "@/shared/constants/routes.ts";

const Home = () => {
    return (
        <div className={"mt-56"}>
            <div className={"text-center"}>
                <h1>Welcome to frello app!</h1>
                <p className={"mt-4"}>There should be a landing page that represents the product</p>
            </div>

            <div className={"mt-6 flex gap-5 justify-center items-center"}>
                <Button variant={"outline"} asChild>
                    <Link to={routes.LOGIN}>
                        Log In
                    </Link>
                </Button>

                <Button asChild>
                    <Link to={routes.REGISTER}>
                        Sign Up
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Home;
