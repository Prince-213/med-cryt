"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface Prop {
  text: string;
}

export function FormButton({ text }: Prop) {
  "use client";
  const { pending } = useFormStatus();

  if (pending) {
    console.log("pending");
  }

  return (
    <Button
      type="submit"
      className=" w-full h-14 text-center text-lg font-medium"
      disabled={pending}
    >
      {pending ? (
        <Loader2Icon className=" animate-spin w-8 h-8 text-white mr-4" />
      ) : null}{" "}
      {text}
    </Button>
  );
}
