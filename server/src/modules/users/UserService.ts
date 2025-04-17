import UserRepository from "@/modules/users/UserRepository";
import bcrypt from 'bcrypt';
import {User} from "@/prisma/client";
import {CreateUserDTO, UserDTO} from "@/prisma/types";
import ErrorResponse from "@/response/ErrorResponse";


class UserService {
    async create({email, password}: CreateUserDTO): Promise<UserDTO> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository
            .create({email, password: hashedPassword});

        return this.makeUserDto(user);
    }

    async findAndValidatePassword({email, password}: CreateUserDTO): Promise<UserDTO> {
        const user = await UserRepository.find({email});
        if (!user) throw ErrorResponse.badRequest("пользователь не найден или неверный пароль");

        const isPasswordValid = bcrypt.compare(user.password, password);
        if (!isPasswordValid) throw ErrorResponse.badRequest("пользователь не найден или неверный пароль");

        return this.makeUserDto(user);
    }

    makeUserDto(user: User | null): UserDTO {
        if (!user) throw ErrorResponse.iternalServerError();

        const {password, ...dto} = user;
        return dto;
    }
}

export default new UserService();