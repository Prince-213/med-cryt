"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader, Shield, User } from "lucide-react";
import { BsClipboardPulse } from "react-icons/bs";
import { adminLogin, staffLogin } from "@/lib/actions";

const initialState = {
  message: "",
};

export default function Login() {
  useEffect(() => {
    // Clear any existing sessions when landing on login page
    localStorage.removeItem("admin_session");
    localStorage.removeItem("staff_session");

    // Clear cookies if needed
    document.cookie =
      "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "staff_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }, []);

  const [loginType, setLoginType] = useState<"admin" | "staff">("staff");
  const [state, formAction, pending] = useActionState(
    loginType === "admin" ? adminLogin : staffLogin,
    initialState
  );

  return (
    <div className="w-full h-screen text-cyan-200 bg-[#012D33] flex flex-col items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <div className="flex items-center space-x-5">
          <BsClipboardPulse className="text-cyan-200 w-10 h-10" />
          <h1 className="font-bold text-3xl uppercase text-white">imedic</h1>
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign in to Dashboard
        </h2>

        {/* Login Type Toggle */}
        <div className="mt-6 w-full max-w-xs">
          <div className="flex rounded-lg bg-gray-800 p-1">
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-all ${
                loginType === "admin"
                  ? "bg-cyan-600 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Shield size={20} />
              <span className="font-medium">Admin</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType("staff")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-all ${
                loginType === "staff"
                  ? "bg-cyan-600 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User size={20} />
              <span className="font-medium">Staff</span>
            </button>
          </div>
        </div>

        {/* Login Type Indicator */}
        <div className="mt-4 text-center">
          <p className="text-cyan-300 font-medium">
            Logging in as{" "}
            {loginType === "admin" ? "Administrator" : "Staff Member"}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {loginType === "admin"
              ? "Full access to all system features"
              : "Limited access based on staff permissions"}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} method="POST" className="space-y-6">
          {/* Hidden field to indicate login type */}
          <input type="hidden" name="loginType" value={loginType} />

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
                placeholder={`Enter ${loginType} email`}
                className="w-full p-4 rounded-lg text-black focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-base font-medium text-cyan-200"
              >
                Password
              </label>
              {loginType === "staff" && (
                <span className="text-sm text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded">
                  Staff Portal
                </span>
              )}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg text-black focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          <p
            aria-live="polite"
            className="text-red-500 font-medium text-center min-h-[24px]"
          >
            {state?.message}
          </p>

          <div>
            <button
              disabled={pending}
              type="submit"
              className="w-full py-4 text-black rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 transition-colors font-semibold flex items-center justify-center"
            >
              {pending ? (
                <div className="flex items-center space-x-2">
                  <Loader className="animate-spin text-white" />
                  <p>Signing in as {loginType}...</p>
                </div>
              ) : (
                <p>Sign in as {loginType === "admin" ? "Admin" : "Staff"}</p>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-center text-gray-400">
              {loginType === "admin"
                ? "Need staff access? Switch to staff login above."
                : "Administrator? Switch to admin login above."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
