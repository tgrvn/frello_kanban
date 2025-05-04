import ActivationTokenService from "@/modules/auth/services/ActivationTokenService";
import MailService from "@/mailer/MailService";
import {UserDTO} from "@/prisma/types";
import HttpError from "@/response/HttpError";

export const sendActivationEmail = async (user: UserDTO) => {
    if (!user) throw HttpError.iternalServerError();

    const token = await ActivationTokenService.create(user.id);
    await MailService.sendActivationEmail(user.email, token);
}
