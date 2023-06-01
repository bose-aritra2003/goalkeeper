'use client';

import Image from "next/image";
import { useRouter  } from "next/navigation";
import { HiArrowSmRight } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi2";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="bg-transparent py-16 flex flex-col space-y-10 xl:flex-row xl:space-y-0 xl:justify-between items-center">
      <div className="space-y-5 px-4 xl:px-0 xl:pl-16 2xl:pl-36">
        <div className="text-gray-900 leading-20 text-center space-y-5 xl:space-y-3 text-5xl xl:text-left font-bold 2xl:text-6xl">

          <div className="flex space-x-2 w-fit mx-auto xl:mx-0">
            <div className="flex items-center space-x-2">
                <Image
                  width={100} height={100}
                  src="/images/logo.svg"
                  alt="logo"
                  className="drop-shadow-lg w-14 sm:w-20"
                />

              <span className="sr-only">goalkeeper</span>
              <span className="text-5xl sm:text-7xl font-bold tracking-tight text-blue-900 drop-shadow-sm">
                Goalkeeper
              </span>
            </div>
            <span className="mt-0.5 font-bold bg-yellow-400 h-fit text-amber-950 text-[0.5rem] py-1 px-1 border border-black rounded-md drop-shadow-sm">
              AI
            </span>
          </div>

          <p className="text-xl 2xl:text-2xl text-gray-500 font-light">Simple, lightweight & elegant task manager for the modern world.</p>
        </div>
        <div className="w-fit mx-auto xl:mx-0 xl:ml-1 flex flex-col items-center space-y-3 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <button
            className="text-white flex items-center justify-center rounded-xl px-4 py-3 text-md font-semibold bg-gray-500/20 hover:bg-gray-500/30 transition-all ease-in-out"
            onClick={() => router.push('/auth?variant=register')}
          >
            <div className="flex space-x-1 items-center text-xl sm:text-2xl font-medium">
              <p>Register</p>
              <HiChevronRight />
            </div>
          </button>
          <button
            className="text-white flex items-center justify-center rounded-xl px-4 py-3 text-md font-semibold transition-all ease-in-out"
            onClick={() => router.push('/auth?variant=login')}
          >
            <div className="flex space-x-1 items-center text-xl sm:text-2xl font-medium drop-shadow-lg">
              <p>Login</p>
              <HiArrowSmRight/>
            </div>
          </button>
        </div>
      </div>

      <div className="w-fit px-2 xl:px-0 xl:pr-16 2xl:pr-36">
        <Image priority className="2xl:hidden" width={600} height={600} src="/images/hero.svg" alt="hro image" />
        <Image priority className="hidden 2xl:block" width={800} height={800} src="/images/hero.svg" alt="hro image" />
      </div>
    </div>
  );
}
export default Hero;