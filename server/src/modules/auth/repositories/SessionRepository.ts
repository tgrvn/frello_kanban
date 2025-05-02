import prisma from "@/prisma/prisma";
import {Prisma, Session} from "@/prisma/client";
import SessionWhereUniqueInput = Prisma.SessionWhereUniqueInput;
import SessionCreateInput = Prisma.SessionCreateInput;

class SessionRepository {
    async create(data: SessionCreateInput): Promise<Session> {
        return prisma.session.create({data});
    }

    async findUnique(params: SessionWhereUniqueInput): Promise<Session | null> {
        console.log("PARAMS >", params);
        return prisma.session.findUnique({where: params});
    }

    async deleteByToken(token: string): Promise<void> {
        await prisma.session.delete({where: {token}});
    }

    async countUserSessions(userId: string): Promise<number> {
        return prisma.session.count({where: {userId}});
    }
}

export default new SessionRepository();
