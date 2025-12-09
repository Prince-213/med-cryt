"use client";

import { logout } from "@/lib/actions";
import { Loader, LogOut } from "lucide-react";
import React, { useState } from "react";

const LogoutButton = () => {
  const [pending, setPending] = useState(false);

  const signOut = async () => {
    setPending(true);

    try {
      await logout();
    } catch {
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={signOut}
      className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-150"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="font-medium">Logout</span>
    </button>
  );
};

export default LogoutButton;
