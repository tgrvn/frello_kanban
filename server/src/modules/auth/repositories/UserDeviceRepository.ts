import prisma from "@/prisma/prisma";
import {Prisma, UserDevice} from "@/prisma/client";
import UserDeviceUpdateInput = Prisma.UserDeviceUpdateInput;
import UserDeviceCreateInput = Prisma.UserDeviceCreateInput;

class UserDeviceRepository {
    async findUniqueByPair(userId: string, deviceId: string) {
        return prisma.userDevice.findUnique({where: {user_device_pair: {userId, deviceId}}})
    }

    async updateByPair(userId: string, deviceId: string, data: UserDeviceUpdateInput) {
        return prisma.userDevice.update({data, where: {user_device_pair: {userId, deviceId}}})
    }

    async createOrUpdate(userId: string, data: Omit<UserDeviceCreateInput, "user">) {
        return prisma.userDevice.upsert({
            where: {user_device_pair: {userId, deviceId: data.deviceId}},
            update: {isTrusted: true},
            create: {...data, isTrusted: true, user: {connect: {id: userId}}}
        });
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