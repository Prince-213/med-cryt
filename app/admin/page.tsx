/* eslint-disable @typescript-eslint/ban-ts-comment */

export const revalidate = 0;
export const dynamic = "force-dynamic";

import React from "react";
import DashboardUI from "./(ui)/DashboardUI";
import prisma from "@/lib/prisma";

const AdminPage = async () => {
  const usersData = await prisma.patient.findMany({
    include: {
      vitalSigns: true
    }
  });

  return (
    <>
      {
        // @ts-ignore
        <DashboardUI data={usersData} />
      }
    </>
  );
};

export default AdminPage;
