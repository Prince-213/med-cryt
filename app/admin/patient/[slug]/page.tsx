export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import PatientSlug from "./(ui)/PatientSlug";

const page = async ({ params }: { params: { slug: string } }) => {
  const patientParam = await params;

  const patientData = await prisma.patient.findUnique({
    where: {
      id: patientParam.slug
    },
    include: {
      vitalSigns: true
    }
  });

  console.log(patientData);

  return (
    <div className=" p-10">
      <Suspense
        fallback={
          <div className=" w-full h-[40vh] rounded-2xl bg-gray-300 animate-pulse"></div>
        }
      >
        <PatientSlug patientData={patientData} />
      </Suspense>
    </div>
  );
};

export default page;
