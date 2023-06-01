'use client';

import {HiArrowSmRight} from "react-icons/hi";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {signIn, useSession} from "next-auth/react";
import Spinner from "@/app/components/loading/Spinner";

type Variant = "login" | "register";

const AuthForm = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const queryVariant = searchParams?.get("variant");

  const router = useRouter();


  const [variant, setVariant] = useState<Variant>(queryVariant === "register" ? "register" : "login");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.replace('/workspace')
    }
  }, [session?.status, router, searchParams])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (variant === "register") {
      try {
        await fetch('https://goal-keeper.vercel.app/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, email, password})
        })
        toast.success("Account created successfully! Now sign in to continue");
        toggleVariant();
      } catch (error: any) {
        toast.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    }
    if (variant === "login") {
      setIsLoading(true);
      try {
        const callback = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        if (callback?.error) {
          toast.error('Invalid credentials');
        } else if (callback?.ok) {
          toast.success('Logged in successfully');
          router.push('/workspace');
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  const toggleVariant = useCallback(() => {
    if (variant === "login") {
      setVariant("register");
    } else {
      setVariant("login");
    }
  }, [variant]);


  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col text-base leading-6 space-y-5 text-white sm:text-lg sm:leading-7">
        <div className="flex flex-col space-y-7">
          {
            variant === 'register' && (
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  className="bg-transparent peer placeholder-transparent h-10 w-full border-b border-white text-white focus:outline-none focus:borer-rose-600"
                />
                <label
                  htmlFor="username"
                  className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
            )
          }

          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="bg-transparent peer placeholder-transparent h-10 w-full border-b border-white text-white focus:outline-none focus:borer-rose-600"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="bg-transparent peer placeholder-transparent h-10 w-full border-b border-white text-white focus:outline-none focus:borer-rose-600"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
            >
              Password
            </label>
          </div>
        </div>


        <button type="submit" className="flex space-x-2 mx-auto items-center text-white hover:drop-shadow-lg w-fit">
          <p className="flex flex-row space-x-2 items-center">
            {isLoading && <Spinner />}
            { variant === 'login' ? 'Login' : 'Register' }
          </p>
          <HiArrowSmRight/>
        </button>

        <div className="flex space-x-2 justify-center text-sm px-2 text-white">
          <div>
            { variant === 'login' ? 'New to Goalkeeper?' : 'Already have an account?' }
          </div>
          <div
            onClick={toggleVariant}
            className="w-fit underline underline-offset-2 font-bold cursor-pointer"
          >
            { variant === 'login' ? 'Create an account' : 'Login' }
          </div>
        </div>
      </div>
    </form>
  );
}
export default AuthForm;