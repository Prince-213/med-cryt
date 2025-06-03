"use client";

import { Loader, LogOut } from "lucide-react";
import React, { useState } from "react";
import { adminLogout } from "@/lib/actions";

const LogoutButton = () => {
  const [pending, setPending] = useState(false);

  const signOut = async () => {
    setPending(true);

    try {
      await adminLogout();
    } catch {
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={signOut}
      className="bg-red-100 space-x-2 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-red-400 border border-red-500 "
    >
      {pending ? <Loader className=" animate-spin" /> : <LogOut />}
      {pending ? <p>logging Out...</p> : <p>logout</p>}
    </button>
  );
};

export default LogoutButton;
