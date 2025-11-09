'use client'
import React from 'react'
import {motion} from 'motion/react'


const Hero2 = () => {
  return (
    <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200  p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="max-w-7xl mx-auto overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="/hey.png"
              alt="Landing page preview"
              className="aspect-video h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
  )
}

export default Hero2
