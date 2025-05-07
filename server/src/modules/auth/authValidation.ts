import {z} from "zod";
import UserRepository from "@/modules/users/UserRepository";
import {IClientMetaData} from "@/shared/types/express";

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

export const verifyTokenSchema = z.object({
    code: z.string(),
    token: z.string()
});

export const sendPasswordResetEmailSchema = z.object({
    email: z.string().email(),
});

export type LoginData = z.infer<typeof loginSchema>

export interface IAuthData extends LoginData, IClientMetaData {
}
