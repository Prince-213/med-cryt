import { Loader } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <div className=" flex items-center space-x-2">
        <Loader className=" animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
