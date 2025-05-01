"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { links } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { BsClipboardPulse } from "react-icons/bs";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className=" p-5 w-[15%] bg-site-grey border-r-2 border-r-gray-200/50  h-full">
      <div className=" flex items-center space-x-5">
        <BsClipboardPulse className=" text-cyan-500 w-10 h-10" />
        <h1 className=" font-bold text-3xl uppercase text-gray-700">imedic</h1>
      </div>
      <div className=" border rounded-xl p-3 mt-5 class flex items-center space-x-3">
        <div>
          <h1 className=" font-semibold text-base">Admin Report</h1>
          <p className=" text-sm text-gray-400">Hospital report</p>
        </div>
      </div>
      <nav className=" my-8">
        <ul className=" flex flex-col space-y-10">
          {links.map((item, index) => {
            return (
              <Link
                href={`${item.href}`}
                key={index}
                className={` flex flex-row items-center hover:bg-site-blue/10 transition-all duration-150 space-x-3 ${
                  item.href.startsWith(pathname)
                    ? "bg-blue-500/10"
                    : " bg-transparent"
                } px-4 py-3 rounded-xl`}
              >
                <Image src={`/${item.icon}`} alt="" width={30} height={30} />

                <p className=" capitalize font-medium">{item.name}</p>
              </Link>
            );
          })}

          <div
            className={` flex flex-row items-center hover:bg-site-blue/10 transition-all duration-150 space-x-3 ${
              pathname.startsWith("/admin/patient")
                ? "bg-blue-500/10"
                : " bg-transparent"
            } px-4 py-3 rounded-xl`}
          >
            <Image
              src={`/icons8-staff-96 .png`}
              alt=""
              width={30}
              height={30}
            />

            <p className=" capitalize font-medium">Patient</p>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
