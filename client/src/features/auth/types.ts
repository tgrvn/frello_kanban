export interface IUser {
    id: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserData {
    user: IUser;
    token: string;
}