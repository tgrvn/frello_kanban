import {create} from "zustand/react";
import {IUser} from "@/features/auth/types.ts";

type Store = {
    user: IUser | null
    token: string | null
    isAuth: boolean
}

type Actions = {
    setUser: (user: IUser) => void
    setToken: (token: string) => void
    setIsAuth: (isAuth: boolean) => void
}

export const useUserStore = create<Store & Actions>((set) => ({
    user: null,
    token: null,
    isAuth: false,

    setUser: (user) => set({user}),
    setToken: (token) => set({token}),
    setIsAuth: (isAuth) => set({isAuth}),
}))