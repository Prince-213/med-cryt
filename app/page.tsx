import Image from "next/image";
import Link from "next/link";
import { BsClipboardPulse } from "react-icons/bs";

export default function Home() {
  return (
    <div className=" w-full bg-[#012D33]  min-h-screen relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  transform-gpu overflow-hidden  blur-3xl"
      >
        <div className="mx-auto aspect-[1155/678] rounded-full w-[50rem] bg-gradient-to-tr from-[#D3CDBD] to-[#E3BC87] opacity-30" />
      </div>
      <header className=" w-full border-b border-b-white/10 py-6">
        <div className=" w-[90%] mx-auto flex items-center justify-between">
          <div className=" flex items-center space-x-5">
            <BsClipboardPulse className=" text-cyan-200 w-10 h-10" />
            <h1 className=" font-bold text-3xl uppercase text-white">imedic</h1>
          </div>

          <div>
            <Link
              href={"/login"}
              className=" bg-yellow-500 rounded-full px-10 py-4 font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
      <main className=" w-full text-center pt-14">
        <h1 className=" text-[#F6FFFF] text-balance justify-center text-8xl capitalize font-semibold max-w-[60%] leading-[7rem] mx-auto">
          keep your medical data with confidence
        </h1>

        <p className=" text-[#F6FFFF]/50 text-xl capitalize max-w-[50%] text-pretty mt-6 justify-center leading-[2rem] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          maxime voluptatum atque, velit eaque doloribus minus laudantium
          aliquid repudiandae ipsa odit eveniet consequatur error, eius nesciunt
          cupiditate at corporis! Provident!
        </p>

        <div className=" pt-20 space-x-5 flex items-center">
          <div className=" bg-red-300 rounded-3xl h-[40vh] w-[14vw] relative overflow-hidden">
            <Image
              src={"/images/benjamin-lehman-gkZ-k3xf25w-unsplash.jpg"}
              fill
              alt=""
              className=" object-center object-cover"
            />
          </div>
          <div className=" bg-red-300 rounded-full h-[40vh] relative overflow-hidden  w-[14vw]">
            <Image
              src={"/images/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"}
              fill
              alt=""
              className=" object-center object-cover"
            />
          </div>
          <div className=" bg-red-300 rounded-full h-[40vh] relative overflow-hidden  w-[40vw]">
            <Image
              src={"/images/online-marketing-hIgeoQjS_iE-unsplash.jpg"}
              fill
              alt=""
              className=" object-center object-cover"
            />
          </div>
          <div className=" bg-red-300 rounded-3xl h-[40vh]  relative overflow-hidden w-[14vw]">
            <Image
              src={"/images/benjamin-lehman-gkZ-k3xf25w-unsplash.jpg"}
              fill
              alt=""
              className=" object-center object-cover"
            />
          </div>
          <div className=" bg-red-300 rounded-[50%] h-[40vh] w-[20vw] relative overflow-hidden">
            <Image
              src={"/images/image 773.png"}
              fill
              alt=""
              className=" object-center object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
