'use client';

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { otpFormSchema } from "@/Schema/Schema";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { config } from "@/config/config";


const VerifyOTPContainer = ({
    setIsAuthenticated,
    setUser,
    fetchChats,
    fetchUsers
} : any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const TIMER_INITIAL = 60;
    const [timer, setTimer] = useState<number>(TIMER_INITIAL);
    const router = useRouter();
    const searchParams = useSearchParams();
     const email = searchParams.get("email");
    
    // ✅ CALL useToast AT THE TOP LEVEL
    useEffect(() => {
        if (!email) {
            router.push('/login');
        }
    }, [email, router]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        };
    }, [timer]);
  
    const form = useForm<z.infer<typeof otpFormSchema>>({
        resolver: zodResolver(otpFormSchema),
        defaultValues: {
            otp: "",
        },
    });

    async function onSubmit({ otp }: z.infer<typeof otpFormSchema>) {
        setLoading(true);

        try {
            const { data } = await axios.post(`${config.USER_SERVICE.VERIFY_OTP}`, {
                otp: otp,
                email: email,
            });
            console.log(otp);
            console.log("data verify otp", data);
            Cookies.set("token", data.token , {
                expires: 7,
                secure: false,
                path: '/',
            });
            
            // useToast("Success", "OTP Verified Successfully");
            setIsAuthenticated(true);
            console.log('auth' , true);
            fetchChats();
            console.log('fetchChats');
            fetchUsers();
            console.log('fetchUsrs');
            setUser(data.user);
            console.log("data of user" , data.user);
            router.push('/chat');
        } catch (error: any) {
            console.log(error);
            // useToast("Error Occurred", error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const handleResendOTP = async () => {
        try {
            setLoading(true);
            if (!email) {
                router.push('/login');
                return;
            }
            const { data } = await axios.post(`${config.USER_SERVICE.SEND_OTP}`, {
                email: email,
            });
            setTimer(TIMER_INITIAL);
            // useToast("OTP Sent", `A new OTP was sent to ${email}`);
        } catch (err: any) {
            // useToast("Error", err?.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-4xl bg-linear-to-r from-pink-500 via-pink-200 to-transparent bg-clip-text text-transparent">ChatX</CardTitle>
                    <CardDescription className="text-md">
                        Join ChatX and start chatting instantly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="otp"
                                control={form.control}
                                render={({ field, fieldState }: { field: any, fieldState: any }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="flex justify-center" htmlFor="form-rhf-demo-otp">One-Time Password</FieldLabel>

                                        <div className="flex justify-center">
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup className="flex gap-2">
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>

                                        <FieldDescription className="flex justify-center text-center">
                                            Please enter the one-time password sent to {email || "your email"}
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Field orientation="responsive">
                        <Button type="submit" form="form-rhf-demo" disabled={loading} >
                            Submit
                        </Button>
                    </Field>
                    <div>
                        {
                            timer > 0 ? (
                                <p className="text-sm text-neutral-400">Resend After {timer} seconds.</p>
                            ) : (
                                <Button variant="outline" onClick={handleResendOTP} disabled={loading}>
                                    Resend OTP
                                </Button>
                            )
                        }
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default VerifyOTPContainer