"use client";

export const revalidate = 0;

import React from "react";

import Image from "next/image";

import { StaffComponentTable } from "@/app/(ui)/shared/staff-view";

import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiCalendar, HiUser } from "react-icons/hi";
import { useActionState } from "react";
import { createUser } from "@/lib/actions";
import { toast } from "sonner";

import { useEffect } from "react";

const initialState = {
  message: ""
};

const DashboardUI = ({ data }: { data: Patient[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const [state, formAction, pending] = useActionState(createUser, initialState);

  const gender = ["male", "female"];

  useEffect(() => {
    console.log(state);
    if (state.message == "success") {
      toast.success("Patient add successfully");
    } else if (state.message == "error") {
      toast.error("Error during request..");
    }
  }, [state]);

  return (
    <div className=" w-full ">
      <div className=" w-full">
        <div className=" w-[96%] mt-5 mb-10 mx-auto flex items-center justify-between">
          <div className=" flex items-center space-x-4">
            <div className=" p-2 rounded-lg bg-gray-300/50 w-fit">
              <Image src={"/meeting.png"} alt="" width={25} height={25} />
            </div>
            <span className=" flex items-center space-x-3">
              <h1 className=" text-4xl font-medium">2</h1>
              <p className=" text-gray-400 text-lg ">Patients</p>
            </span>
          </div>
          <div className=" flex items-center space-x-5">
            {/* <FadeUpIntro delay={0.3}>
              <button className=" flex items-center space-x-2 border border-gray-200 px-4 py-2 rounded-lg">
                <ListFilterIcon />
                <h1 className=" font-medium">Filters</h1>
              </button>
            </FadeUpIntro> */}

            <button
              onClick={() => setIsOpen(true)}
              className=" flex items-center bg-blue-500 space-x-2  px-4 py-2 rounded-lg"
            >
              <h1 className=" font-medium text-white">Add Patient</h1>
            </button>
          </div>
        </div>

        <StaffComponentTable data={data} />
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="NEW PATIENT" titleIcon={HiCalendar} />
        <Drawer.Items>
          <form method="POST" action={formAction}>
            <div className="mb-6 mt-3">
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <TextInput
                id="name"
                name="name"
                type="text"
                required
                placeholder="Apple Keynote"
              />
            </div>
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <TextInput
                required
                id="email"
                type="email"
                name="email"
                placeholder="Apple Keynote"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>

              <select
                id="role"
                name="gender"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a Role</option>
                {gender.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="name" className="mb-2 block">
                Age
              </Label>
              <TextInput
                type="number"
                min={1}
                id="name"
                name="age"
                required
                placeholder="Enter Age"
              />
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="name" className="mb-2 block">
                Address
              </Label>
              <Textarea
                id="address"
                name="address"
                required
                placeholder="Enter Address"
              />
            </div>

            <Button type="submit" className="w-full">
              <div className=" flex items-center space-x-2">
                <HiUser className="mr-2" />
                <p>{pending ? "Creating..." : "Create Account"}</p>
              </div>
            </Button>

            {/*   <p
              aria-live="polite"
              className=" text-red-500 font-medium text-center"
            >
              {state?.message}
            </p> */}
            <br />
            {/*  <Button type="submit" className="w-full">
              {pending ? (
                <div className=" flex items-center space-x-2">
                  <Loader className=" animate-spin text-white" />
                  <p>Creating...</p>
                </div>
              ) : (
                <div className=" flex items-center space-x-2">
                  <HiCalendar className="mr-2" />
                  <p>Assign Account</p>
                </div>
              )}
            </Button> */}
          </form>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default DashboardUI;
