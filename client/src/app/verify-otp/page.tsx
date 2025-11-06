'use client';

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

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
import { Input } from "@/components/ui/input"
import { otpFormSchema } from "@/Schema/Schema";
import { useRouter, useSearchParams } from "next/navigation";
import useToast from "@/components/_components/useToast";
import axios from "axios";


const page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const TIMER_INITIAL = 10;
    const [timer, setTimer] = useState<number>(TIMER_INITIAL);
    const [isCounting, setIsCounting] = useState<boolean>(true);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
    const router = useRouter();

    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "your email";

    const form = useForm<z.infer<typeof otpFormSchema>>({
        resolver: zodResolver(otpFormSchema),
        defaultValues: {
            otp: "",
        },
    });

    async function onSubmit({ otp }: z.infer<typeof otpFormSchema>) {
        setLoading(true);

        try {
            const { data: any } = await axios.post(`${process.env.USER_SERVICE_URL}/api/v1/verify-otp`, {
                otp: otp,
                email: email,
            });
            console.log(otp);

        } catch (error: any) {
            console.log(error.message);
            useToast("Error Occurred", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // start or stop the interval based on isCounting
        if (isCounting) {
            // clear any existing interval first
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        // stop interval and mark counting stopped
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        setIsCounting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            // not counting: ensure interval cleared
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isCounting]);



    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                     <CardTitle className="text-4xl bg-linear-to-r from-pink-500 via-pink-200 to-transparent bg-clip-text text-transparent">ChatX</CardTitle>
                    <CardDescription>
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
                                            Please enter the one-time password sent to {email}
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
                            <Button variant="link" onClick={async () => {
                                try {
                                    setLoading(true);
                                    // TODO: call resend API endpoint here if available
                                    // await axios.post(`${process.env.USER_SERVICE_URL}/api/v1/resend-otp`, { email });
                                    // Reset timer and start counting again
                                    setTimer(TIMER_INITIAL);
                                    setIsCounting(true);
                                    useToast("OTP Sent", `A new OTP was sent to ${email}`);
                                } catch (err: any) {
                                    useToast("Error", err?.message || "Failed to resend OTP");
                                } finally {
                                    setLoading(false);
                                }
                            }}>
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

export default page
