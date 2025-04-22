import {apiAuth, apiPub} from "@/shared/api/axios.ts";
import {LoginData, RegisterData} from "@/features/auth/schema.ts";
import {IUserData} from "@/features/auth/types.ts";
import AxiosXHR = Axios.AxiosXHR;

export const login = async (data: LoginData) => {
    const res = await apiPub.post(`/auth/login`, data);
    return res.data;
}

//refactor here
export const register = async (data: RegisterData): Promise<IUserData> => {
    try {
        const res: AxiosXHR<IUserData> = await apiPub.post(`/auth/register`, data);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const logout = async () => {
    const res = await apiAuth.post(`/auth/logout`, {});
    return res.data;
}

export const refresh = async () => {
    const res = await apiPub.post(`/auth/refresh`, {});
    return res.data;
}