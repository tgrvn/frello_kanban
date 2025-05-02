import {z} from "zod";
import UserRepository from "@/modules/users/UserRepository";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const registrationSchema = z.object({
    email: z
        .string({message: "неверный тип данных"})
        .email({message: "неверная почта"})
        .refine(async (email) => !(await UserRepository.isEmailExists(email)),
            {message: "пользователь с таким email уже зарегестрирован"}),

    password: z.string(),
    passwordConfirm: z.string(),
    isAcceptedTerms: z.boolean()
});

export type LoginData = z.infer<typeof loginSchema>
export interface IAuthData extends LoginData {
    ip: string;
    userAgent: string;
    deviceId: string;
    fingerprint: string;
}
