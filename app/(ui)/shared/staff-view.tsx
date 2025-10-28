import {
  Button,
  Drawer,
  Label,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput
} from "flowbite-react";
import {
  Eye,
  Loader2,
  MoreVertical,
  PlusCircle,
  Trash,
  User
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { addVitals, deleteRecord } from "@/lib/actions";
import { GiHospitalCross } from "react-icons/gi";
import { FaHandHoldingMedical } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

const initialState = {
  message: ""
};

export function StaffComponentTable({ data }: { data: Patient[] }) {
  const [isPatOpen, setIsPatOpen] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const [pend, setPend] = useState(false);

  const removeRecord = async (id: string) => {
    setPend(true);

    try {
      await deleteRecord(id);

      toast.success("Record detleted successfully");
    } catch {
      toast.error("Error deleting record");
    } finally {
      setPend(false);
    }
  };

  const handlePatClose = () => setIsPatOpen(false);
  const content = ({ id, disabled }: { id: string; disabled: boolean }) => (
    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Actions</h3>
      </div>
      <Link
        href={`/admin/patient/${id}`}
        className="px-3 flex hover:bg-gray-100 w-full items-center space-x-2 py-2"
      >
        <Eye />
        <p>View Records</p>
      </Link>
      <button
        onClick={() => {
          setSelectedId(id);
          setIsPatOpen(true);
        }}
        className={`px-3 flex ${disabled ? "hidden" : ""} hover:bg-gray-100 w-full items-center space-x-2 py-2`}
      >
        <PlusCircle />
        <p>Add Medicals</p>
      </button>
      <button
        disabled={pend}
        onClick={() => {
          setSelectedId(id);
          removeRecord(id);
        }}
        className={`px-3 flex justify-between  hover:bg-gray-100 w-full items-center space-x-2 py-2`}
      >
        <div className=" flex items-center space-x-2">
          <Trash />
          <p>Delete Records</p>
        </div>
        {pend && <Loader2 className=" animate-spin" />}
      </button>
    </div>
  );

  const [state, formAction, pending] = useActionState(addVitals, initialState);

  useEffect(() => {
    console.log(state);
    if (state.message == "success") {
      toast.success("Vitals added successfully");
      setIsPatOpen(false)
    } else if (state.message == "error") {
      toast.error("Vitals upload Unsuccessfully");
      setIsPatOpen(false)
    }
  }, [state]);

  return (
    <div className=" w-[96%] mx-auto overflow-y-scroll h-[85vh]">
      <Drawer open={isPatOpen} onClose={handlePatClose} position="right">
        <Drawer.Header title="ADD MEDICAL DATA" titleIcon={GiHospitalCross} />
        <Drawer.Items>
          <form method="POST" action={formAction}>
            <div className="mb-6 mt-3">
              <Label htmlFor="name" className="mb-2 block">
                Id
              </Label>
              <TextInput
                id="id"
                name="id"
                type="text"
                defaultValue={selectedId}
              />
            </div>
            <div className="mb-6 mt-3">
              <Label htmlFor="name" className="mb-2 block">
                Blood Pressure
              </Label>
              <TextInput
                id="blood"
                name="blood"
                type="number"
                min={1}
                required
                placeholder="Apple Keynote"
              />
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="heart" className="mb-2 block">
                Heart Rate
              </Label>
              <TextInput
                id="heart"
                name="heart"
                type="number"
                min={1}
                required
                placeholder="Heart Rate"
              />
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="temperature" className="mb-2 block">
                Temperature
              </Label>
              <TextInput
                id="temperature"
                name="temperature"
                type="number"
                min={1}
                required
                placeholder="Apple Keynote"
              />
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="height" className="mb-2 block">
                Height
              </Label>
              <TextInput
                id="height"
                name="height"
                type="number"
                min={1}
                required
                placeholder="Apple Keynote"
              />
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="weight" className="mb-2 block">
                Weight
              </Label>
              <TextInput
                id="weight"
                name="weight"
                type="number"
                min={1}
                required
                placeholder="Weight"
              />
            </div>

            <div className="mb-6 mt-3">
              <Label htmlFor="bmi" className="mb-2 block">
                BMI
              </Label>
              <TextInput
                id="bmi"
                name="bmi"
                type="number"
                min={1}
                required
                placeholder="BMI"
              />
            </div>

            <Button type="submit" className="w-full">
              <div className=" flex items-center space-x-2">
                <FaHandHoldingMedical className="mr-2" />
                <p>{pending ? "Adding..." : "Add Medicals"}</p>
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
      <Table hoverable>
        <TableHead className=" ">
          <TableHeadCell className=" space-x-10 font-normal  text-gray-500 ">
            <div className=" flex items-center space-x-5">
              <h1>Patient Name</h1>
            </div>
          </TableHeadCell>
          <TableHeadCell className=" space-x-10 font-normal  text-gray-500">
            Email
          </TableHeadCell>
          <TableHeadCell className=" space-x-10 font-normal  text-gray-500">
            Gender
          </TableHeadCell>
          <TableHeadCell className=" space-x-10 font-normal  text-gray-500">
            Age
          </TableHeadCell>

          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>

        <TableBody className="divide-y">
          {data.map((patient, index) => {
            return (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {/* <TableCell className="p-4">
                    <Checkbox />
                  </TableCell> */}
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className=" flex items-center space-x-4">
                    <div className=" relative ">
                      <User />
                    </div>
                    <div className=" ">
                      <h2 className=" font-[500] text-base ">{patient.name}</h2>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {/* <FadeUpIntro delay={0.2}>
                      <h2 className=" font-medium text-black text-base">
                        90888999-6677
                      </h2>
                    </FadeUpIntro> */}

                    <p className=" font-semibold text-site-blue">
                      {patient.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className=" font-normal text-sm text-gray-400">
                    {patient.gender}
                  </p>
                </TableCell>
                <TableCell className=" font-medium text-black">
                  <p>{patient.age}</p>
                </TableCell>

                <TableCell>
                  <Popover
                    content={content({
                      id: patient.id,
                      disabled: patient.vitalSigns.length > 0 ? true : false
                    })}
                    placement="right"
                  >
                    <button>
                      <MoreVertical />
                    </button>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
