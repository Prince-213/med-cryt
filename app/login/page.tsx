"use client";

import { useActionState } from "react";
import { Loader } from "lucide-react";
import { BsClipboardPulse } from "react-icons/bs";
import { adminLogin } from "@/lib/actions";

const initialState = {
  message: ""
};

export default function Login() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className=" w-full h-screen text-cyan-200 bg-[#012D33] flex flex-col items-center justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <div className=" flex items-center space-x-5">
            <BsClipboardPulse className=" text-cyan-200 w-10 h-10" />
            <h1 className=" font-bold text-3xl uppercase text-white">imedic</h1>
          </div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
            Sign in to Admin Dashboard
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-cyan-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className=" w-full  p-4 rounded-lg text-black "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-cyan-200"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="password"
                  className=" w-full  p-4 rounded-lg text-black "
                />
              </div>
            </div>

            <p
              aria-live="polite"
              className=" text-red-500 font-medium text-center"
            >
              {state?.message}
            </p>

            <div>
              <button
                disabled={pending}
                type="submit"
                className=" w-full py-4 text-black rounded-lg bg-yellow-500 flex items-center justify-center "
              >
                {pending ? (
                  <div className=" flex items-center space-x-2">
                    <Loader className=" animate-spin text-white" />
                    <p>Loggin...</p>
                  </div>
                ) : (
                  <p>Log in</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
