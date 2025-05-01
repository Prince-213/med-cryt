export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import PatientSlug from "./(ui)/PatientSlug";

// For a dynamic route like [slug]/page.tsx

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const patientData = await prisma.patient.findUnique({
    where: {
      id: slug
    },
    include: {
      vitalSigns: true
    }
  });

  if (!patientData) {
    return <div>Patient not found</div>;
    // Alternatively, you could redirect or throw notFound()
    // throw new Error('Patient not found');
    // or for Next.js 13+:
    // notFound();
  }

  return (
    <div className="p-10">
      <Suspense
        fallback={
          <div className="w-full h-[40vh] rounded-2xl bg-gray-300 animate-pulse"></div>
        }
      >
        <PatientSlug patientData={patientData} />
      </Suspense>
    </div>
  );
};

export default Page;
