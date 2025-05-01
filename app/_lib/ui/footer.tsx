import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";

const FootorBar = () => {
  return (
    <div className=" py-[15vh] w-full bg-[#495460]">
      <div className=" w-[85%] space-y-24 text-white mx-auto">
        <div className=" w-full flex lg:flex-row lg:space-y-0 space-y-4 flex-col items-center justify-between border-b-2 border-[#8080807c] pb-[6vh]">
          <h1 className=" max-w-[80%] lg:max-w-[50%] text-4xl lg:text-left text-center lg:text-5xl font-bold">
            Ready to take your skills to the next level?
          </h1>
          <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgb(0,119,255)] px-8 py-4 font-semibold bg-blue-500 rounded-md text-white  transition duration-200 ease-linear">
            Get Started
          </button>
        </div>
        <div className=" grid grid-cols-1 space-y-10 lg:space-y-0 lg:grid-cols-4 lg:gap-x-32">
          <div className=" space-y-16">
            <h1 className=" font-bold text-2xl">Emrancis</h1>
            <div className=" space-y-6">
              <div className=" flex items-center space-x-3">
                <TwitterLogoIcon width={"24px"} height={"24px"} />
                <InstagramLogoIcon width={"24px"} height={"24px"} />
                <GitHubLogoIcon width={"24px"} height={"24px"} />
              </div>
              <p>Copyright © 2023 Techty. All Rights Reserved</p>
            </div>
          </div>
          <div className=" space-y-6">
            <h1 className=" font-bold text-lg">Quick Links</h1>
            <ul className=" space-y-3 flex flex-col">
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                About
              </a>
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Services
              </a>
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Blog
              </a>
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Contact
              </a>
            </ul>
          </div>
          <div className=" space-y-6">
            <h1 className=" font-bold text-lg">Social</h1>
            <ul className=" space-y-3 flex flex-col">
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Twitter
              </a>
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Instagram
              </a>
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Facebook
              </a>
              <a
                href="#"
                className=" hover:text-blue-500 duration-100 transition-all"
              >
                Github
              </a>
            </ul>
          </div>
          <div className=" space-y-6">
            <h1 className=" font-bold text-lg">Our Newsletter</h1>
            <p>Subscribe to our newsletter to get our news delivered to you.</p>
            <div className=" h-12 overflow-hidden w-full flex justify-between rounded-lg border-2 border-[#8080807c] ">
              <input
                type="text"
                className=" border-b-2 border-[#8080807c] p-5 bg-transparent border-none outline-none w-[80%]"
                placeholder="Email address"
              />
              <button className=" bg-blue-500 w-[20%] text-center">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootorBar;
