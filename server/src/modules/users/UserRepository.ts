import prisma from "@/prisma/prisma";
import {Prisma, User} from "@/prisma/client";
import UserUpdateInput = Prisma.UserUpdateInput;
import UserCreateInput = Prisma.UserCreateInput;
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

class UserRepository {
    async create({email, password}: UserCreateInput): Promise<User> {
        return prisma.user.create({
            data: {email, password, isAcceptedTerms: true},
        });
    }

    async edit(id: string, data: UserUpdateInput): Promise<User> {
        return prisma.user.update({where: {id}, data});
    }

    async findUniqueByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}});
    }

    async isEmailExists(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({where: {email}});
        return !!user;
    }
}

export default new UserRepository();