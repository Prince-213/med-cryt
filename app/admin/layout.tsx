import type { Metadata } from "next";
import SideBar from "../(ui)/shared/sidebar";

import { Search, Plus, ChevronDown, User } from "lucide-react";

import localFont from "next/font/local";
import LogoutButton from "./(ui)/LogoutButton";

const myFont = localFont({
  src: "../(font)/Outfit-Variable.ttf",
  display: "swap",
  variable: "--my-font",
});

export const metadata: Metadata = {
  title: "Medical Encrytion",
  description: "State of the Art Medical Encryption Software",
};

/* const getStaffs = async () => {
  const data = await prisma.staff.findMany({
    include: {
      tasks: {
        select: {
          id: true,
          staffId: true,
          title: true,
          date: true,
          description: true,
          location: true,
          time: true,
          status: true
        }
      }
    }
  });

  return data;
};
 */

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* const staffs = await getStaffs(); */

  // Run the function every 2 minutes
  //cron.schedule("*/2 * * * *", checkTasksAndSendEmail(staffs));

  //console.log("Task Reminder Service Running...");

  return (
    <html lang="en">
      <body
        className={`${myFont.className} w-full overflow-hidden bg-white h-screen`}
      >
        <div className=" w-full h-screen flex">
          <SideBar />

          <div className=" w-[85%] bg-site-white h-full">
            <header className=" w-full py-4  border-b-[2px] border-b-gray-200/80 ">
              <div className=" flex justify-between items-center w-full  border-b-gray-200 px-8 ">
                <h1 className=" font-[500] text-3xl">Admin Panel</h1>
                <div className=" w-fit flex items-center space-x-8 ">
                  <div className=" flex items-center space-x-3">
                    <div className="  w-[20rem] p-2 rounded-full flex bg-site-grey space-x-4 border border-gray-300">
                      <Search className=" text-gray-400 w-6 h-6" />
                      <input
                        placeholder="Search for anything here..."
                        className=" bg-transparent text-sm outline-transparent w-full border-none focus:border-none  "
                      />
                    </div>
                    <button className=" w-10 h-10 rounded-[50%] bg-site-blue flex items-center justify-center">
                      <Plus className=" text-white" />
                    </button>
                  </div>
                  <div className=" flex items-center divide-x">
                    <div className=" flex items-center space-x-3 text-gray-400 px-5">
                      <LogoutButton />
                    </div>
                    {/* <FadeUpIntro delay={0.3}>
                      <div className=" flex items-center space-x-3 px-5">
                        <div className=" w-8 h-8 rounded-[50%] flex items-center justify-center bg-green-300/50">
                          <Flag className=" w-4 h-4 text-green-700" />
                        </div>
                        <p className=" font-semibold text-sm">1/4</p>
                      </div>
                    </FadeUpIntro> */}
                    <div className=" flex items-center space-x-3 pl-5">
                      <div className=" w-10 h-10 overflow-hidden rounded-[50%] relative">
                        <User />
                      </div>
                      <div>
                        <h2 className=" font-[500] text-base ">Jane Doe</h2>

                        <p className=" font-normal text-sm text-gray-400">
                          Admin
                        </p>
                      </div>
                      <ChevronDown className=" w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
