import Image from "next/image";

export function AvatarGroup() {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      <Image
        className="w-14 h-14 border-2 border-white rounded-full dark:border-gray-800"
        src="https://images.unsplash.com/photo-1707912079134-becf5a3598e2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={50}
        height={50}
        alt=""
      />
      <Image
        className="w-14 h-14 border-2 border-white rounded-full dark:border-gray-800"
        src="https://images.unsplash.com/photo-1707912079134-becf5a3598e2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={50}
        height={50}
        alt=""
      />
      <Image
        className="w-14 h-14 border-2 border-white rounded-full dark:border-gray-800"
        src="https://images.unsplash.com/photo-1707912079134-becf5a3598e2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={50}
        height={50}
        alt=""
      />
      <a
        className="flex items-center justify-center w-14 h-14 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
        href="#"
      >
        +99
      </a>
    </div>
  );
}
