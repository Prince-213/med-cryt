import { SuspiciousLoginsTable } from "@/lib/components/suspicious-login-table";
import prisma from "@/lib/prisma";
import React from "react";

const ThreatPage = async () => {
  const threatData = await prisma.threat.findMany();

  return (
    <div className=" w-full min-h-screen overflow-y-scroll pb-20">
      <SuspiciousLoginsTable threatData={threatData} />
    </div>
  );
};

export default ThreatPage;
