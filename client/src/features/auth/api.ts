import {apiAuth, apiPub} from "@/shared/api/axios.ts";
import {LoginData, RegisterData} from "@/features/auth/schema.ts";

export const login = async (data: LoginData) => {
    const res = await apiPub.post(`/auth/login`, data);
    return res.data;
}

export const register = async (data: RegisterData) => {
    const res = await apiPub.post(`/auth/register`, data);
    return res.data;
}

export const logout = async () => {
    const res = await apiAuth.post(`/auth/logout`, {});
    return res.data;
}

export const regiter = async () => {
    const res = await apiPub.post(`/auth/register`, {});
    return res.data;
}