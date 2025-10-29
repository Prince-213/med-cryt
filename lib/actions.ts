/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import generateUniqueId from "generate-unique-id";
import prisma from "./prisma";
import { encryptString, getBaseUrl } from "./utils";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createUser(prevState: any, formData: FormData) {
  const id3 = generateUniqueId({
    includeSymbols: ["@", "#", "|"],
    length: 10,
    excludeSymbols: ["0"],
  });

  console.log(formData);

  const name = formData.get("name");
  const email = formData.get("email");
  const gender = formData.get("gender");
  const age = formData.get("age");
  const address = formData.get("address")?.toString() || "";

  console.log(id3);

  const cryptAddress = await encryptString(address, id3);

  try {
    console.log(id3);
    await prisma.patient.create({
      data: {
        kd: id3,
        name: name?.toString() || "",
        email: email?.toString() || "",
        gender: gender?.toString() || "",
        age: age?.toString() || "",
        adress: cryptAddress,
      },
    });

    try {
      const response = await fetch(`${getBaseUrl()}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.get("name")?.toString()}`,
          email: `${formData.get("email")?.toString()}`,
          message: `Welcome ${name?.toString()} to IMEDIC. Your Digital profile has been created. This is your decryption key ${id3}`,
        }),
      });

      revalidatePath("/admin");

      if (response.ok) {
        console.log("Email sent successfully!");

        return {
          message: "success",
        };
      } else {
        const errorDetails = await response.json();
        console.error("Error sending email:", errorDetails.message);
        return {
          message: "wrong",
        };
      }
    } catch (error) {
      console.error("There was a problem sending the email:", error);
      return {
        message: "wrong",
      };
    }

    return { message: "success" };
  } catch (err) {
    console.error("Error creating user", err);
    return { message: "error" };
  }
}

export async function addVitals(prevState: any, formData: FormData) {
  try {
    console.log(formData);

    const key = await prisma.patient.findUnique({
      where: {
        id: formData.get("id")?.toString() || "",
      },
      select: {
        kd: true,
      },
    });

    const keyD = key?.kd;

    await prisma.patient.update({
      where: {
        id: formData.get("id")?.toString() || "",
      },
      data: {
        vitalSigns: {
          create: {
            bloodPressure:
              (await encryptString(formData.get("blood")?.toString(), keyD)) ||
              "",
            heartRate:
              (await encryptString(formData.get("heart")?.toString(), keyD)) ||
              "",
            temperature:
              (await encryptString(
                formData.get("temperature")?.toString(),
                keyD
              )) || "",
            weight:
              (await encryptString(formData.get("weight")?.toString(), keyD)) ||
              "",
            height:
              (await encryptString(formData.get("height")?.toString(), keyD)) ||
              "",
            bmi:
              (await encryptString(formData.get("bmi")?.toString(), keyD)) ||
              "",
          },
        },
      },
    });

    revalidatePath("/admin");

    return { message: "success" };
  } catch (err) {
    console.log(err);
    return { message: "error" };
  }
}

export async function addThreat(name: string) {
  try {
    await prisma.threat.create({
      data: {
        name,
        time: `${Date.now()}`,
      },
    });
  } catch (err) {
    console.log(err);
    return { message: "error" };
  }
}

export async function vital(formData: FormData) {
  console.log(formData);
}

export async function adminLogin(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const cookieStore = await cookies();

  if (email != "medadmin@gmail.com" && password != "pass@1234") {
    return { message: "Please enter a valid credential" };
  }

  cookieStore.set("admin", "sdk23@ksjkfdka", { secure: true });
  redirect("/admin");
}

export const adminLogout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("admin");
  redirect("/");
};

export const deleteRecord = async (id: string) => {
  try {
    const result = await prisma.vitalSigns.deleteMany({
      where: {
        patientId: id,
      },
    });

    await prisma.patient.delete({
      where: {
        id,
      },
    });
    console.log(`Deleted ${result.count} vital signs records`);

    revalidatePath("/admin");
  } catch (err) {
    console.error(err);
  }
};
