'use client';

import React, { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { loginFormSchema } from "@/Schema/Schema";
import { useRouter } from "next/navigation";
import useToast from "@/components/_components/useToast";
import axios from "axios";

const page = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit({ email }: z.infer<typeof loginFormSchema>) {
        setLoading(true);

        try {
            // const { data: any } = await axios.post(`${process.env.USER_SERVICE_URL}/api/v1/login`, {
            //     email: email,
            // });

            router.push(`/verify-otp?email=${email}`);
        } catch (error: any) {
            console.log(error.message);
            useToast("Error Occurred", error.message);
        } finally {
            setLoading(false);
        }
    }



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
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                        />
                                        <FieldDescription>
                                            This is your public display email.
                                           
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
                <CardFooter>
                    <Field orientation="responsive">
                        <Button type="submit" form="form-rhf-demo" disabled={loading as boolean}>
                            Send OTP
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page
