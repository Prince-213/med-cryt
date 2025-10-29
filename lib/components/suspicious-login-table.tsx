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
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface SuspiciousLogin {
  id: string;
  name: string;
  timeOfLogin: string;
  severity: "high" | "medium" | "low";
}



const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
      return "bg-blue-500 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function SuspiciousLoginsTable({ threatData }: { threatData: Threat[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div>
            <CardTitle>Suspicious Logins</CardTitle>
            <CardDescription>
              {threatData.length} suspicious login attempts detected
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Time of Login</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {threatData.map((login) => (
                <TableRow key={login.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{login.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {login.time}
                  </TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
