import nodemailer, {SendMailOptions, Transporter} from "nodemailer";
import {MAIL_HOST, MAIL_PORT} from "@/shared/utils/constants";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import HttpError from "@/response/HttpError";

class MailService {
    private readonly transporter: Transporter;
    private readonly from: string = "Frello Kanban <frello@support.com>";

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false
        })

        this.transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    extname: ".hbs",
                    partialsDir: path.resolve("./src/shared/services/mailer/templates"),
                    defaultLayout: false,
                },
                viewPath: path.resolve("./src/shared/services/mailer/templates"),
                extName: ".hbs",
            })
        );
    }

    async sendActivationEmail(to: string, token: string): Promise<void> {
        const activationLink = 'http://localhost:3000/api/auth/activate/' + token;
        try {
            const message = await this.transporter.sendMail({
                from: this.from,
                to,
                subject: "Activation Email",
                template: "activation",
                context: {
                    activationLink
                },
            } as SendMailOptions);

            console.log(message);
        } catch (err) {
            throw HttpError.iternalServerError("failed to send activation email");
        }
    }

    async sendForgotPasswordEmail(to: string, token: string): Promise<void> {
        const resetLink = 'http://localhost:3000/api/auth/forgot-password/reset-password/' + token;

        try {
            const message = await this.transporter.sendMail({
                from: this.from,
                to,
                subject: "Reset Your Password",
                template: "forgotPassword",
                context: {
                    resetLink,
                },
            } as SendMailOptions);

            console.log(message);
        } catch (err) {
            console.log(err)
            throw HttpError.iternalServerError("failed to send forgot password email");
        }
    }

    async sendSuspiciousAttemptEmail(to: string, ip: string, userAgent: string, timestamp: string): Promise<void> {
        try {
            const message = await this.transporter.sendMail({
                from: this.from,
                to,
                subject: "Suspicious Login Activity",
                template: "suspiciousAttempt",
                context: {
                    userAgent, timestamp, ip
                }
            } as SendMailOptions);

            console.log(message);
        } catch (err) {
            throw HttpError.iternalServerError("failed to send suspicious attempt email");
        }
    }

    async sendTwoFactorCode(to: string, code: string): Promise<void> {
        try {
            const message = await this.transporter.sendMail({
                from: this.from,
                to,
                subject: "Two Factor Code",
                template: "twoFactor",
                context: {
                    code
                }
            } as SendMailOptions);

            console.log(message);
        } catch (err) {
            throw HttpError.iternalServerError("failed to send 2FA code");
        }


    }
}

export default new MailService();