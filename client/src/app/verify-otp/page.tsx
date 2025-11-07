"use client";

import { SpinnerEmpty } from "@/components/_components/Spinner";
import VerifyOTPContainer from "@/components/_components/VerifyOTPContainer";
import { useAppData } from "@/context/appContext";
import { redirect } from "next/navigation";


const page = () => {
    const {isAuthenticated , setIsAuthenticated , setUser , loading: userLoading , fetchChats , fetchUsers} = useAppData();

    if(userLoading){
        return <SpinnerEmpty/>
    }

    if(isAuthenticated){
        redirect('/chat');
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
