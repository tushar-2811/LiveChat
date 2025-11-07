'use client';

import LoginContainer from "@/components/_components/LoginContainer";
import { SpinnerEmpty } from "@/components/_components/Spinner";
import { useAppData } from "@/context/appContext";
import { redirect } from "next/navigation";

const page = () => {
    const {isAuthenticated , loading: userLoading} = useAppData();

    if(userLoading){
        return <SpinnerEmpty/>
    }

    if(isAuthenticated){
        redirect('/chat');
    }
    return (
        <LoginContainer/>
    )
}

export default page
