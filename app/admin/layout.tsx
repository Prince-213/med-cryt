import type { Metadata } from "next";
import { cookies } from "next/headers";
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
  title: "Medical Encryption",
  description: "State of the Art Medical Encryption Software",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get cookies on server side
  const cookieStore = await cookies();

  // Check for session cookies
  const hasAdminSession = cookieStore.has("admin_session");
  const hasStaffSession = cookieStore.has("staff_session");

  // Determine user type
  let userType: "admin" | "staff" | null = null;
  let userName = "Jane Doe";
  let userRole = "Admin";

  if (hasAdminSession) {
    userType = "admin";
    userRole = "Administrator";
  } else if (hasStaffSession) {
    userType = "staff";
    userName = "Staff Member";
    userRole = "Staff";
  }

  // If no session, don't show the layout (redirect should happen via middleware)
  if (!userType) {
    // Return minimal layout that will redirect via middleware
    return (
      <div
        className={`${myFont.className} w-full overflow-hidden bg-white h-screen`}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${myFont.className} w-full overflow-hidden bg-white h-screen`}
    >
      <div className="w-full h-screen flex">
        {/* Pass userType to SideBar */}
        <SideBar userType={userType} />

        <div className="w-[85%] bg-site-white h-full">
          <header className="w-full py-4 border-b-[2px] border-b-gray-200/80">
            <div className="flex justify-between items-center w-full border-b-gray-200 px-8">
              <h1 className="font-[500] text-3xl capitalize">
                {userType === "admin" ? "Admin" : "Staff"} Panel
              </h1>
              <div className="w-fit flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-[20rem] p-2 rounded-full flex bg-site-grey space-x-4 border border-gray-300">
                    <Search className="text-gray-400 w-6 h-6" />
                    <input
                      placeholder="Search for anything here..."
                      className="bg-transparent text-sm outline-transparent w-full border-none focus:border-none"
                    />
                  </div>
                  {userType === "admin" && (
                    <button className="w-10 h-10 rounded-[50%] bg-site-blue flex items-center justify-center">
                      <Plus className="text-white" />
                    </button>
                  )}
                </div>
                <div className="flex items-center divide-x">
                 
                  <div className="flex items-center space-x-3 pl-5">
                    <div className="w-10 h-10 overflow-hidden rounded-[50%] relative">
                      <User />
                    </div>
                    <div>
                      <h2 className="font-[500] text-base">{userName}</h2>
                      <p className="font-normal text-sm text-gray-400 capitalize">
                        {userRole}
                      </p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
