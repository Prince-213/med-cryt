import Image from "next/image";
import Link from "next/link";
import { BsClipboardPulse } from "react-icons/bs";

export default function Home() {
  return (
    <div className="w-full bg-[#012D33] min-h-screen relative">
      {/* Background Blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transform-gpu overflow-hidden blur-3xl"
      >
        <div className="mx-auto aspect-[1155/678] rounded-full w-[30rem] md:w-[50rem] bg-gradient-to-tr from-[#D3CDBD] to-[#E3BC87] opacity-30" />
      </div>

      {/* Header */}
      <header className="w-full border-b border-b-white/10 py-4 md:py-6">
        <div className="w-[90%] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-5">
            <BsClipboardPulse className="text-cyan-200 w-8 h-8 md:w-10 md:h-10" />
            <h1 className="font-bold text-2xl md:text-3xl uppercase text-white">imedic</h1>
          </div>

          <div>
            <Link
              href={"/login"}
              className="bg-yellow-500 rounded-full px-6 py-2 md:px-10 md:py-4 font-semibold text-sm md:text-base"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full text-center pt-8 md:pt-14 px-4">
        <h1 className="text-[#F6FFFF] text-balance text-4xl md:text-6xl lg:text-8xl capitalize font-semibold max-w-full md:max-w-[90%] lg:max-w-[60%] leading-[3rem] md:leading-[5rem] lg:leading-[7rem] mx-auto">
          keep your medical data with confidence
        </h1>

        <p className="text-[#F6FFFF]/50 text-base md:text-xl capitalize max-w-full md:max-w-[80%] lg:max-w-[50%] text-pretty mt-4 md:mt-6 mx-auto leading-[1.5rem] md:leading-[2rem]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          maxime voluptatum atque, velit eaque doloribus minus laudantium
          aliquid repudiandae ipsa odit eveniet consequatur error, eius nesciunt
          cupiditate at corporis! Provident!
        </p>

        {/* Image Gallery */}
        <div className="pt-10 md:pt-20 flex flex-wrap justify-center gap-4 px-4">
          <div className="bg-red-300 rounded-3xl h-[150px] w-[150px] md:h-[25vh] md:w-[14vw] relative overflow-hidden">
            <Image
              src={"/images/benjamin-lehman-gkZ-k3xf25w-unsplash.jpg"}
              fill
              alt="Medical illustration"
              className="object-center object-cover"
              priority
            />
          </div>
          
          <div className="bg-red-300 rounded-full h-[150px] w-[150px] md:h-[25vh] md:w-[14vw] relative overflow-hidden">
            <Image
              src={"/images/national-cancer-institute-L8tWZT4CcVQ-unsplash.jpg"}
              fill
              alt="Cancer research"
              className="object-center object-cover"
              priority
            />
          </div>
          
          <div className="bg-red-300 rounded-full h-[150px] w-full md:h-[25vh] md:w-[40vw] relative overflow-hidden">
            <Image
              src={"/images/online-marketing-hIgeoQjS_iE-unsplash.jpg"}
              fill
              alt="Digital healthcare"
              className="object-center object-cover"
              priority
            />
          </div>
          
          <div className="bg-red-300 rounded-3xl h-[150px] w-[150px] md:h-[25vh] md:w-[14vw] relative overflow-hidden">
            <Image
              src={"/images/benjamin-lehman-gkZ-k3xf25w-unsplash.jpg"}
              fill
              alt="Medical data"
              className="object-center object-cover"
              priority
            />
          </div>
          
          <div className="bg-red-300 rounded-[50%] h-[150px] w-[150px] md:h-[25vh] md:w-[20vw] relative overflow-hidden">
            <Image
              src={"/images/image 773.png"}
              fill
              alt="Health technology"
              className="object-center object-cover"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
