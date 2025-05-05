import {Prisma, UserDevice} from "@/prisma/client";
import {CreateUserDeviceDTO, DeviceCheckDTO} from "@/prisma/types";
import UserDeviceRepository from "@/modules/auth/repositories/UserDeviceRepository";
import HttpError from "@/response/HttpError";

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

    async findAndUpdate({ip, fingerprint, deviceId, userAgent, userId}: CreateUserDeviceDTO): Promise<UserDevice> {
        const device = await UserDeviceRepository.findUnique(userId, deviceId);
        if (!device) throw HttpError.twoFactorRequired();

        this.isSuspiciousDevice(device, {
            ip,
            fingerprint,
            deviceId,
            userAgent
        });
        
        return UserDeviceRepository.update(device.id, {userAgent, ip, fingerprint});
    }

    isSuspiciousDevice(device: UserDevice | null, {ip, deviceId, userAgent, fingerprint}: DeviceCheckDTO): boolean {
        if (!device) return false;
        let trustScore = 0;

        if (fingerprint !== device.fingerprint) trustScore += 3;
        if (device.deviceId !== deviceId) trustScore += 2;

        if (userAgent !== device.userAgent) trustScore += 1;
        if (ip !== device.ip) trustScore += 1;

        if (trustScore >= 3) throw HttpError.twoFactorRequired();

        return trustScore >= 3;
    }
}

export default new UserDeviceService();