import * as z from "zod";

export const loginFormSchema = z.object({
    email: z.email("Invalid email address"),
})

export const otpFormSchema = z.object({
    otp: z.string().length(6, "Your one-time password must be 6 digts."),
})