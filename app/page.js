"use client"
import Image from "next/image";
import Link from "next/link";
import localFont from 'next/font/local'

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  subsets: ["latin"],
});


export default function Home() {

  return (
    <>
      <main className="bg-[#d9c3da] min-h-screen relative overflow-hidden text-slate-900">

        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-200 rounded-full blur-[120px] opacity-50"></div>
        <section className="container mx-auto grid-cols-1 md:grid-cols-2 min-h-[80vh] not-lg:items-center px-6 flex flex-col">

          <div className="flex flex-col gap-6 items-center justify-center">
           
              <h1 className={`${poppins.className} text-5xl md:text-6xl font-extrabold leading-tight text-indigo-900`}>
                Short Links.
                <span className="text-indigo-600"> Zero Tracking.</span>
              </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-md">
              The fastest way to shorten URLs without the headache of accounts or data tracking. Simple, secure, and entirely private.
            </p>

            <div className="flex gap-4">
              <Link href='/shorten'
                className='bg-indigo-600 hover:bg-indigo-700 transition-all text-white shadow-xl rounded-full font-bold px-8 py-3 mb-5'>
                Get Started
              </Link>
              {/* <Link href='/github'
                className='border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full font-bold px-8 py-3'>
                View Code
              </Link> */}
            </div>
          </div>

          <div className="md:flex ">

            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
              <img
                className="relative mix-blend-multiply drop-shadow-2xl"
                src="/vector.jpg"
                alt="Modern Link Concept"
              />
            </div>
          </div>

        </section>
      </main>

    </>
  );
}
