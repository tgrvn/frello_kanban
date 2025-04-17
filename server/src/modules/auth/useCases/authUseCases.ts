import SessionService, {ITokensPair} from "@/modules/auth/SessionService";
import SessionRepository from "@/modules/auth/SessionRepository";
import UserService from "@/modules/users/UserService";
import UserRepository from "@/modules/users/UserRepository";
import {IAuthData} from "@/modules/auth/authValidation";
import {UpdateSessionDTO, UserDTO} from "@/prisma/types";

type IAuthResult = { user: UserDTO; } & ITokensPair;

export const registerUser = async ({email, password, ip, ua, fingerprint}: IAuthData): Promise<IAuthResult> => {
    const user = await UserService.create({email, password});
    const tokens = SessionService.generateTokens({id: user.id});
    const session = await SessionRepository.create({userId: user.id, fingerprint, ip, ua, token: tokens.refreshToken});

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
};

export const loginUser = async ({email, password, ip, ua, fingerprint}: IAuthData): Promise<IAuthResult> => {
    const user = await UserService.findAndValidatePassword({email, password});
    const tokens = SessionService.generateTokens({id: user.id});
    const session = await SessionRepository.create({userId: user.id, fingerprint, ip, ua, token: tokens.refreshToken});

    return {user, refreshToken: session.token, accessToken: tokens.accessToken};
}

export const refreshUser = async ({token, ip, ua, fingerprint}: UpdateSessionDTO): Promise<IAuthResult> => {
    const payload = SessionService.verifyRefreshToken(token);
    const session = await SessionService.findByToken(token);

    // TO DO: make ua, ip and fingerprint check
    // if (session.ip !== ip || session.ua !== ua || session.fingerprint !== fingerprint) throw ErrorResponse.unauthorized();

    //refactor user data fetch
    const user = UserService.makeUserDto(await UserRepository.find({id: payload.user.id}));
    const tokens = SessionService.generateTokens({id: payload.user.id});

    const newSession = await SessionRepository.updateById(session.id, {
        token: tokens.refreshToken,
        ip,
        ua,
        fingerprint
    });
    return {user, refreshToken: newSession.token, accessToken: tokens.accessToken};
}