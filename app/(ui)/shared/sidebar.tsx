"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { links } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { BsClipboardPulse } from "react-icons/bs";
import LogoutButton from "@/app/admin/(ui)/LogoutButton";

interface SideBarProps {
  userType: "admin" | "staff" | null;
}

const SideBar = ({ userType }: SideBarProps) => {
  const pathname = usePathname();

  // Don't show sidebar if no user type
  if (!userType) {
    return null;
  }

  // Filter links based on user type
  const filteredLinks = links.filter((link) => {
    if (!userType) return false;

    // Admin can see all links
    if (userType === "admin") return true;

    // Staff can only see Dashboard
    if (userType === "staff") {
      return link.href === "/admin" || link.name === "Dashboard";
    }

    return false;
  });

  // Handle logout
  const handleLogout = () => {
    // Clear cookies
    document.cookie =
      "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "staff_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="p-5 w-[15%] bg-site-grey border-r-2 border-r-gray-200/50 h-full">
      {/* Header */}
      <div className="flex items-center space-x-5">
        <BsClipboardPulse className="text-cyan-500 w-10 h-10" />
        <div>
          <h1 className="font-bold text-3xl uppercase text-gray-700">imedic</h1>
          <p className="text-sm text-gray-500 capitalize">
            {userType} Dashboard
          </p>
        </div>
      </div>

      {/* User Info Section */}
      <div className="border rounded-xl p-3 mt-5">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              userType === "admin" ? "bg-purple-500" : "bg-blue-500"
            }`}
          >
            <span className="text-white font-semibold">
              {userType === "admin" ? "A" : "S"}
            </span>
          </div>
          <div>
            <h1 className="font-semibold text-base capitalize">
              {userType} User
            </h1>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  userType === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {userType.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        {userType === "admin" && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-medium">
              Full System Access
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="my-8">
        <ul className="flex flex-col space-y-4">
          {filteredLinks.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                href={item.href}
                key={index}
                className={`flex flex-row items-center hover:bg-site-blue/10 transition-all duration-150 space-x-3 ${
                  isActive
                    ? "bg-blue-500/10 border-l-4 border-blue-500"
                    : "bg-transparent"
                } px-4 py-3 rounded-xl`}
              >
                <Image
                  src={`/${item.icon}`}
                  alt={item.name}
                  width={24}
                  height={24}
                  className={isActive ? "opacity-100" : "opacity-70"}
                />
                <p
                  className={`capitalize font-medium ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </p>
              </Link>
            );
          })}

          {/* Staff-only notice */}
          {userType === "staff" && filteredLinks.length === 1 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>Staff Access:</strong> Limited to dashboard only.
              </p>
            </div>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-gray-200">
       <LogoutButton />
      </div>
    </div>
  );
};

export default SideBar;
