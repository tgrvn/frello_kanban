import nodemailer, {SendMailOptions, Transporter} from "nodemailer";
import {MAIL_HOST, MAIL_PORT} from "@/shared/utils/constants";
import hbs from "nodemailer-express-handlebars";
import path from "path";

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
                    partialsDir: path.resolve("./src/mailer/templates"),
                    defaultLayout: false,
                },
                viewPath: path.resolve("./src/mailer/templates"),
                extName: ".hbs",
            })
        );
    }

    async sendActivationEmail(to: string, activationLink: string) {
        const message = await this.transporter.sendMail({
            from: this.from,
            to,
            subject: "Activation Email",
            template: "activation",
            context: {
                activationLink,
            },
        } as SendMailOptions);

        console.log(message);
    }
}

export default new MailService();