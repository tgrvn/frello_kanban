import {UserDevice} from "@/prisma/client";
import {CreateUserDeviceDTO, DeviceCheckDTO} from "@/prisma/types";
import UserDeviceRepository from "@/modules/auth/repositories/UserDeviceRepository";

class UserDeviceService {
    async create({userId, ip, userAgent, fingerprint, deviceId}: CreateUserDeviceDTO): Promise<UserDevice> {
        return UserDeviceRepository.create({
            user: {connect: {id: userId}},
            ip,
            userAgent,
            fingerprint,
            deviceId,
        });
    }

    async makeDeviceTrusted(deviceId: string, userId: string): Promise<UserDevice> {
        return await UserDeviceRepository.updateByPair(userId, deviceId, {isTrusted: true});
    }

    async verifyAndUpdateDeviceMeta(
        {
            ip,
            fingerprint,
            deviceId,
            userAgent,
            userId
        }: CreateUserDeviceDTO,
        onFailure: () => Promise<never>
    ): Promise<UserDevice> {
        const device = await UserDeviceRepository.findUniqueByPair(userId, deviceId);
        const now = new Date(Date.now());

        if (!device) {
            return await onFailure();
        }

        const isSuspicious = this.isSuspiciousDevice(device, {
            ip,
            fingerprint,
            deviceId,
            userAgent
        });

        if (isSuspicious) {
            return await onFailure();
        }

        return UserDeviceRepository.update(device.id, {userAgent, ip, fingerprint, lastActivity: now});
    }

    isSuspiciousDevice(device: UserDevice, {ip, deviceId, userAgent, fingerprint}: DeviceCheckDTO): boolean {
        let fraudScore = 0;

        if (!device.isTrusted) return true;
        if (fingerprint !== device.fingerprint) fraudScore += 3;
        if (device.deviceId !== deviceId) fraudScore += 2;

        if (userAgent !== device.userAgent) fraudScore += 1;
        if (ip !== device.ip) fraudScore += 1;

        return fraudScore >= 3;
    }
}

export default new UserDeviceService();