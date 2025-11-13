'use client'
import { Cover } from '../ui/cover'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Hero_ = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-2 mt-50'>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative py-6 bg-clip-text text-transparent bg-linear-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
         What’s cooler than messages? <br />  <Cover className='bg-clip-text text-transparent bg-no-repeat bg-linear-to-r from-purple-500 via-violet-500 to-pink-500'>Instant connections.</Cover>
      </h1>

        <div className="flex justify-center gap-2 items-center ">
                <Button className="text-2xl p-4 ">
                Built for speed.
            </Button>
               <Button className="text-2xl p-4 ">
                Zero lag.
            </Button>
               <Button className="hidden md:flex text-2xl p-4 s">
                Powered by people.
            </Button>
            </div>

            <button
            onClick={() => router.push('/chat')} 
            className="flex justify-center w-[220px] mx-auto mt-20 items-center relative gap-4 border-2 border-black rounded-2xl px-4 py-2 text-md md:text-2xl cursor-pointer hover:bg-black hover:text-white">
                Let's Connect <ArrowRight/>
                <div className='absolute w-[90%] h-0.5  bottom-px bg-linear-to-r from-transparent via-pink-500 to-transparent'></div>
            </button>
    </div>
  )
}

export default Hero_
