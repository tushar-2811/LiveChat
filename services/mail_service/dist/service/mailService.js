import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    // you can add pool: true in high throughput scenarios
});
export async function sendOtpEmail(to, subject = 'Your OTP', body) {
    const info = await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to,
        subject,
        text: body
    });
    return info;
}
//# sourceMappingURL=mailService.js.map