import {Link} from "react-router";
import {routes} from "@/shared/constants/routes.ts";
import PrimaryCheckbox from "@/shared/components/PrimaryCheckbox.tsx";
import PrimaryInput from "@/shared/components/PrimaryInput.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import SocialLogin from "@/features/auth/components/SocialLogin.tsx";
import {useForm} from "react-hook-form";
import {RegisterData} from "@/features/auth/schema.ts";
import {register as signUp} from "@/features/auth/api.ts";
import {useUserStore} from "@/features/auth/store.ts";
import {IUserData} from "@/features/auth/types.ts";

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}, control} = useForm<RegisterData>({
        defaultValues: {isAcceptedTerms: false}
    });
    const {setUser, setToken} = useUserStore();

    const onSubmit = async (data: RegisterData) => {
        const userData: IUserData = await signUp(data);
        setUser(userData.user);
        setToken(userData.token);
    }

    return (
        <div>
            <p className={"text-center"}>Sign up to continue</p>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4 mt-3"}>
                <PrimaryInput
                    error={errors?.email?.message}
                    id={"email"}
                    placeholder={"email@example.com"}
                    {...register("email")}
                >
                    Email
                </PrimaryInput>

                <PrimaryInput
                    id={"password"}
                    type={"password"}
                    placeholder={"••••••••••••••"}
                    error={errors?.password?.message}
                    {...register("password")}
                >
                    Password
                </PrimaryInput>

                <PrimaryInput
                    id={"password_confirmation"}
                    type={"password"}
                    placeholder={"••••••••••••••"}
                    error={errors?.password?.message}
                    {...register("passwordConfirm")}
                >
                    Repeat password
                </PrimaryInput>

                <PrimaryCheckbox
                    control={control}
                    error={errors?.isAcceptedTerms?.message}
                    {...register("isAcceptedTerms")}
                >
                    Accept the {" "}
                    <Link
                        className={"text-blue-500 underline font-semibold"}
                        to={routes.TERMS}
                    >
                        terms and conditions
                    </Link>
                </PrimaryCheckbox>

                <div className={"text-sm"}>
                    Already have an account? {" "}
                    <Link
                        className={"text-blue-500 underline"}
                        to={routes.LOGIN}
                    >
                        Log In
                    </Link>
                </div>

                <Button type={"submit"} className={"mt-3"}>Sign up</Button>
            </form>

            <SocialLogin/>
        </div>
    )
}
export default RegisterForm
