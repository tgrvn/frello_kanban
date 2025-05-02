import {ActivationToken, Session, User, UserDevice} from "@/prisma/client";

//user
export type UserDTO = Omit<User, "password" | "isAcceptedTerms">;

//session
export type CreateSessionDTO = Pick<Session, "userId" | "token" | "userDeviceId">

//activation token
export type CreateActivationTokenDTO = Pick<ActivationToken, "userId" | "token" | "expiresIn">;

//device
export type CreateUserDeviceDTO = Omit<UserDevice, "id" | "createdAt" | "isTrusted">;
export type DeviceCheckDTO = Pick<UserDevice, "ip" | "deviceId" | "userAgent" | "fingerprint">