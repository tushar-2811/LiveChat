"use client";
import { SpinnerEmpty } from "@/components/_components/Spinner";
import VerifyOTPContainer from "@/components/_components/VerifyOTPContainer";
import { useAppData } from "@/context/appContext";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


const page = () => {
    const { isAuthenticated, setIsAuthenticated, setUser, loading: userLoading, fetchChats, fetchUsers } = useAppData();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/chat');
        }
    }, [isAuthenticated, router]);

    if (userLoading || isAuthenticated) {
        return <SpinnerEmpty />
    }

    return (
        <VerifyOTPContainer
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
            fetchChats={fetchChats}
            fetchUsers={fetchUsers}
        />
    )
}

export default page
