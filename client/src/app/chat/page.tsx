"use client";
import { SpinnerEmpty } from '@/components/_components/Spinner';
import { useAppData } from '@/context/appContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const {isAuthenticated , loading: userLoading} = useAppData();
  const router = useRouter();

  useEffect(() => {
     if(!isAuthenticated && !userLoading){
        router.push('/login');
     }
  },[isAuthenticated , userLoading , router]);

  if(userLoading || (!userLoading && !isAuthenticated)){
    return <SpinnerEmpty/>
  }

  return (
    <div>
      Chat Page
    </div>
  )
}

export default page
