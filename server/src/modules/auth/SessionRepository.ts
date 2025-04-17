import prisma from "@/prisma/prisma";
import {Session} from "@/prisma/client";
import {CreateSessionDTO, UpdateSessionDTO} from "@/prisma/types";

class SessionRepository {
    async create({userId, token, fingerprint, ip, ua}: CreateSessionDTO): Promise<Session> {
        return prisma.session.create({data: {userId, fingerprint, ip, ua, token}});
    }

    async find({token}: { token: string }): Promise<Session | null> {
        return prisma.session.findUnique({where: {token}});
    }

    async deleteByToken(token: string): Promise<void> {
        await prisma.session.delete({where: {token}});
    }

    async updateById(id: string, data: UpdateSessionDTO): Promise<Session> {
        return prisma.session.update({
            where: {id},
            data: {...data}
        });
    }
}

export default new SessionRepository();
