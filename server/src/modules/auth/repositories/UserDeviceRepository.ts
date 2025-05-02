import prisma from "@/prisma/prisma";
import {Prisma, UserDevice} from "@/prisma/client";
import UserDeviceUpdateInput = Prisma.UserDeviceUpdateInput;
import UserDeviceCreateInput = Prisma.UserDeviceCreateInput;

class UserDeviceRepository {
    async findUnique(userId: string, deviceId: string) {
        return prisma.userDevice.findUnique({where: {user_device_pair: {userId, deviceId}}})
    }

    async create(data: UserDeviceCreateInput): Promise<UserDevice> {
        return prisma.userDevice.create({data})
    }

    async countByUser(userId: string): Promise<number> {
        return prisma.userDevice.count({where: {userId}});
    }

    async update(id: string, data: UserDeviceUpdateInput): Promise<UserDevice> {
        return prisma.userDevice.update({where: {id}, data})
    }
}

export default new UserDeviceRepository();