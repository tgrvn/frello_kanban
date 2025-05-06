import UserRepository from "@/modules/users/UserRepository";
import bcrypt from 'bcrypt';
import {Prisma, User} from "@/prisma/client";
import {UserDTO} from "@/prisma/types";
import HttpError from "@/response/HttpError";
import UserCreateInput = Prisma.UserCreateInput;

class UserService {
    async verifyCredentials(email: string, password?: string): Promise<UserDTO> {
        const user = await UserRepository.findUniqueByEmail(email);
        if (!user) throw HttpError.unauthenticated("invalid credentials");

        if (password) {
            const isPasswordValid = bcrypt.compare(user.password, password);
            if (!isPasswordValid) throw HttpError.unauthenticated("invalid credentials");
        }

        return this.makeUserDto(user);
    }

    async activate(id: string): Promise<UserDTO> {
        const user = await UserRepository.edit(id, {isActivated: true});
        return this.makeUserDto(user);
    }

    async create({email, password}: UserCreateInput): Promise<UserDTO> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository.create({email, password: hashedPassword});

        return this.makeUserDto(user);
    }

    makeUserDto(user: User | null): UserDTO {
        if (!user) throw HttpError.iternalServerError();

        const {password, ...dto} = user;
        return dto;
    }
}

export default new UserService();