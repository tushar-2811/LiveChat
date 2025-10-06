import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // you can add pool: true in high throughput scenarios
} as SMTPTransport.Options);

export async function sendOtpEmail(to: string,subject = 'Your OTP',body:string) {

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject,
    text : body
  });

  return info;
}
