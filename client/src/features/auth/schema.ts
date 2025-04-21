import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
    isAcceptedTerms: z.boolean()
})

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>