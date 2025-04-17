import prisma from "@/prisma/prisma";
import {User} from "@/prisma/client";
import {CreateUserDTO} from "@/prisma/types";

class UserRepository {
    async create({email, password}: CreateUserDTO): Promise<User> {
        return prisma.user.create({
            data: {email, password, isAcceptedTerms: true},
        });
    }

    async find(params: { email: string } | { id: string }): Promise<User | null> {
        return prisma.user.findUnique({where: {...params}});
    }

    async isEmailExists(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({where: {email}});
        return !!user;
    }
}

export default new UserRepository();