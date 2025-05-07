import prisma from "@/prisma/prisma";
import {TwoFactorCode} from "@/prisma/client";

class TwoFactorCodeRepository {
    async create(userId: string, code: string, expiresIn: Date): Promise<TwoFactorCode> {
        return prisma.twoFactorCode.create({data: {userId, code, expiresIn}})
    }

    async findUniqueByPair(userId: string, code: string): Promise<TwoFactorCode | null> {
        return prisma.twoFactorCode.findUnique({where: {user_code_pair: {userId, code}}})
    }

    async deleteByUniquePair(userId: string, code: string): Promise<void> {
        await prisma.twoFactorCode.delete({where: {user_code_pair: {userId, code}}})
    }
}

export default new TwoFactorCodeRepository();