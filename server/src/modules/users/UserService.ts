import UserRepository from "@/modules/users/UserRepository";
import bcrypt from 'bcrypt';
import {Prisma, User} from "@/prisma/client";
import {UserDTO} from "@/prisma/types";
import HttpError from "@/response/HttpError";
import UserCreateInput = Prisma.UserCreateInput;
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

class UserService {
    async verifyCredentials(email: string, password?: string): Promise<UserDTO> {
        const user = await UserRepository.findUnique({email});
        if (!user) throw HttpError.unauthenticated("invalid credentials");

        if (password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw HttpError.unauthenticated("invalid credentials");
        }

        return this.makeUserDto(user);
    }

    async findOrThrowBy(by: UserWhereUniqueInput): Promise<UserDTO> {
        const user = await UserRepository.findUnique(by);
        if (!user) throw HttpError.iternalServerError("user not found");

        return this.makeUserDto(user);
    }

    async changePassword(id: string, password: string): Promise<UserDTO> {
        const hashedPassword = await this.hashPassword(password);
        const user = await UserRepository.edit(id, {password: hashedPassword});

        return this.makeUserDto(user);
    }

    async activate(id: string): Promise<UserDTO> {
        const user = await UserRepository.edit(id, {isActivated: true});
        return this.makeUserDto(user);
    }

    async create({email, password}: UserCreateInput): Promise<UserDTO> {
        const hashedPassword = await this.hashPassword(password);
        const user = await UserRepository.create({email, password: hashedPassword});

        return this.makeUserDto(user);
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    makeUserDto(user: User | null): UserDTO {
        if (!user) throw HttpError.iternalServerError();

        const {password, ...dto} = user;
        return dto;
    }
}

export default new UserService();