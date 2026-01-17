"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {

  const pathname = usePathname()

  return (
    <nav className='w-full bg-slate-900 backdrop-blur-md gap-5 px-5 md:px-10 h-20 flex justify-between items-center'>
      <Link href="/" className='flex items-center gap-3 hover:opacity-90 transition-opacity'>
        <img className='md:w-12 md:h-12 w-10 h-10 rounded-xl shadow-sm' src="icon.png" alt="Linkify Logo" />
        <span className='font-bold text-2xl tracking-tighter text-white'>
          Link<span className='text-pink-400'>ify</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className='flex items-center gap-4 md:gap-8 font-semibold text-white'>

        {pathname !== '/' && <>
          <Link href='/home' className='bg-indigo-600 hover:bg-indigo-700 text-white     shadow-md shadow-indigo-100 rounded-full px-3 py-2 text-sm md:text-base transition-all'>
            <li>Go to homePage</li>
          </Link>
        </>}
        {pathname !== "/shorten" && <>

          <Link href='/shorten' className='hover:text-indigo-600 transition-colors'>
            <li>Shorten</li>
          </Link>

          <li className='flex gap-3'>
            <Link href='/shorten' className='bg-indigo-600 hover:bg-indigo-700 text-white     shadow-md shadow-indigo-100 rounded-full px-3 py-2 text-sm md:text-base transition-all'>
              Try Now
            </Link>
            {/* <Link href='/github' className='bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2 text-sm md:text-base transition-all hidden md:block'>
            GitHub
            </Link> */}
          </li>
        </>}
      </ul>
    </nav>
  )
}

export default Navbar