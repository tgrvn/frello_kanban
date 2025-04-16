import prisma from "@/prisma/prisma";
import {AuthData} from "@/validations/authSchema";
import bcrypt from 'bcrypt';
import {Prisma} from "@/prisma/client";
import UserGetPayload = Prisma.UserGetPayload;
import UserSelect = Prisma.UserSelect;
import SessionService from "@/services/SessionService";
import {User} from "@prisma/client";
import ErrorResponse from "@/response/ErrorResponse";

export type UserDTO = Omit<User, "password" | "isAcceptedTerms">

const userSelect: UserSelect = {
    id: true,
    email: true,
    isActivated: true,
    createdAt: true,
    updatedAt: true,
};

interface IAuth extends AuthData {
    ip: string;
    ua: string;
    fingerprint: string;
}

interface IUserData {
    user: User,
    refreshToken: string,
    accessToken: string
}

class UserService {
    async register({email, password, ip, ua, fingerprint}: IAuth): Promise<IUserData> {
        const user = await this.create({email, password});
        const tokens = SessionService.generateTokens({userId: user.id});
        const session = await SessionService.create({userId: user.id, fingerprint, ip, ua, token: tokens.refreshToken});

        return {user, refreshToken: session.token, accessToken: tokens.accessToken};
    }

    async login({email, password, ip, ua, fingerprint}: IAuth): Promise<IUserData> {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) throw ErrorResponse.badRequest("пользователь не найден или неверный пароль");

        const isPasswordValid = bcrypt.compare(user.password, password);
        if (!isPasswordValid) throw ErrorResponse.badRequest("пользователь не найден или неверный пароль");

        const tokens = SessionService.generateTokens({userId: user.id});
        const session = await SessionService.create({userId: user.id, fingerprint, ip, ua, token: tokens.refreshToken});

        return {user, refreshToken: session.token, accessToken: tokens.accessToken};
    }

    async create({email, password}: AuthData): Promise<UserGetPayload<{
        select: typeof userSelect
    }>> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                isAcceptedTerms: true
            },
            select: userSelect
        });

        return user;
    }

    async isUserExists(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({where: {email}});
        return !!user;
    }

    makeUserDto(user: User): UserDTO {
        const {password, ...dto} = user;
        return dto;
    }
}

export default new UserService();