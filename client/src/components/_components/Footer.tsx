import { link } from 'fs'
import Link from 'next/link'
import React from 'react'


const data = [
    {title : 'Benefits' , link : '/benefits'},
    {title : 'Features' , link : '/features'},
    {title : 'Testimonial' , link : '/testimonial'},
    {title : 'Pricing' , link : '/company'},
    {title : 'FAQs' , link : '/blog'},
]


const data2 = [
    {"Legal" : ["Privacy Policy" , "Terms of Service" , "Cookie Policy"]},
    {"Pages" : ["Home" , "About Us" , "Updates"]},
    {"Socials" : ["Twitter" , "LinkedIn" , "Instagram" , "Facebook"]}
]


const Footer = () => {
  return (
    <div className='w-full h-[800px] overflow-hidden bg-black border border-t-white px-8'>
         
         <div className='flex justify-between items-center py-12 border-b border-white/20'>
              <div className='flex items-center gap-4 md:gap-8'>
                 {data.map((item , index) => (
                    <Link key={index} href={item.link} className='text-neutral-400'>
                        {item.title}
                    </Link>
                 ))}
              </div>

              <p className='hidden md:flex text-white font-normal text-5xl'>
                hello@chatX.com
              </p>
         </div>


         <div className='mt-12 flex flex-col md:flex-row justify-between md:flex-start gap-4 md:gap-0'>
               <div className='flex flex-col gap-2'>
                     <h2 className='text-white text-2xl'>ChatX</h2>
                     <p className='text-white/60 text-md max-w-sm'>Building chat experiences <br /> that are real-time and seamless.<br /></p>
                     <p className='text-neutral-600 text-sm'>2025 ChatX. All rights reserved </p>
               </div>


               <div className='flex gap-16'>
                    {
                        data2.map((item , index) => (
                            <div key={index}>
                                <h3 className='text-white text-lg mb-4'>{Object.keys(item)[0]}</h3>
                                <div className='flex flex-col gap-2'>
                                    {Object.values(item)[0].map((subItem:any , subIndex:any) => (
                                        <Link key={subIndex} href='/' className='text-neutral-400 text-md'>
                                            {subItem}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
               </div>
         </div>


         <div className='relative'>
            <p className='text-neutral-700 text-[450px] backdrop-blur-sm opacity-60 text-center '>ChatX</p>
            <div className="absolute bottom-30 w-full h-[200px] bg-linear-to-t from-black via-black/90 to-transparent"></div>
         </div>
    </div>
  )
}

export default Footer
