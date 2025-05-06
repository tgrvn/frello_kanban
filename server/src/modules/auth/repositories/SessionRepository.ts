import prisma from "@/prisma/prisma";
import {Prisma, Session} from "@/prisma/client";
import SessionWhereUniqueInput = Prisma.SessionWhereUniqueInput;
import SessionCreateInput = Prisma.SessionCreateInput;

class SessionRepository {
    async findFirstOldestSessionByDevice(userId: string, userDeviceId: string): Promise<Session | null> {
        return prisma.session.findFirst({where: {userId, userDeviceId}, orderBy: {createdAt: 'asc'}});
    }

    async create(data: SessionCreateInput): Promise<Session> {
        return prisma.session.create({data});
    }

    async findUniqueByToken(token: string): Promise<Session | null> {
        return prisma.session.findUnique({where: {token}});
    }

    async deleteByToken(token: string): Promise<void> {
        await prisma.session.delete({where: {token}});
    }

    async countUserSessions(userId: string, userDeviceId: string): Promise<number> {
        return prisma.session.count({where: {userId, userDeviceId}});
    }
}

export default new SessionRepository();
