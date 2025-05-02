import {ActivationToken} from "@/prisma/client";
import prisma from "@/prisma/prisma";
import {CreateActivationTokenDTO} from "@/prisma/types";

class ActivationTokenRepository {
    async create({userId, token, expiresIn}: CreateActivationTokenDTO): Promise<ActivationToken> {
        return prisma.activationToken.create({data: {userId, token, expiresIn}});
    }

    async delete(token: string) {
        await prisma.activationToken.delete({where: {token}})
    }
}

export default new ActivationTokenRepository();