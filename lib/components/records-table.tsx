"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, User, Users2 } from "lucide-react";

interface PatientRecord {
  otp: string | null;
  kd: string;
  adress: string;
  key: string | null;
  id: string;
  name: string;
  gender: string;
  email: string;
  age: string;
}
export function PatientRecordsTable({
  threatData,
}: {
  threatData: PatientRecord[];
}) {
  const formatDate = (timestamp: string) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Card className="shadow-none  border-none ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/40">
            <Users2 className="h-5 w-5 text-blue-600 dark:text-red-400" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Patient Records
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              {threatData.length
                ? `${threatData.length} suspicious login attempts detected`
                : "No suspicious activity detected"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {threatData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <AlertCircle className="h-10 w-10 mb-3 text-gray-400" />
            <p className="text-sm font-medium">No records found</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                    Key
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                    Email Address
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threatData.map((login, i) => (
                  <TableRow
                    key={login.id}
                    className={`${
                      i % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors`}
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      {login.name}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {login.key}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {login.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
