import React from "react";
import { AvatarGroup } from "./avatar-group";

const TaskCard = () => {
  return (
    <div className=" space-y-1 bg-[#f5f5f5] p-5 rounded-3xl">
      <div>
        <h1 className=" text-xl font-semibold">Front-End Dev</h1>
        <p className=" my-1 text-lg line-clamp-2 text-gray-500">
          We got a project to make a delivey ui kit called Foodnow and other
          things install
        </p>
        <AvatarGroup />
        <div className=" w-full space-y-1">
          <p className=" text-base text-gray-500 text-right">65%</p>
          <div className=" w-full rounded-full h-4 bg-white">
            <div className=" rounded-full bg-emerald-400 w-[65%] h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
