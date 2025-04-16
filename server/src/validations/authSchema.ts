import {z} from "zod";
import UserService from "@/services/UserService";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const registrationSchema = z.object({
    email: z
        .string({message: "неверный тип данных"})
        .email({message: "неверная почта"})
        .refine(async (email) => !(await UserService.isUserExists(email)),
            {message: "пользователь с таким email уже зарегестрирован"}),

    password: z.string(),
    passwordConfirm: z.string(),
    isAcceptedTerms: z.boolean()
});

export type AuthData = z.infer<typeof loginSchema>