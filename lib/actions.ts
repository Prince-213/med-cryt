/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import generateUniqueId from "generate-unique-id";
import prisma from "./prisma";
import { encryptString, getBaseUrl, staffCredentials } from "./utils";
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
        key: id3,
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
  const now = new Date();
  const formattedDate = now.toISOString().replace("T", " ").slice(0, 19);
  try {
    await prisma.threat.create({
      data: {
        name,
        time: `${formattedDate}`,
      },
    });
    console.log("added");
  } catch (err) {
    console.log(err);
    return { message: "error" };
  }
}

export async function vital(formData: FormData) {
  console.log(formData);
}

export async function adminLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();

  // Admin credentials (move to env in production)
  const adminCredentials = {
    email: "admin@imedic.gmail.com",
    password: "AdminSecure@2024",
    id: "admin_001",
  };

  if (!email || !password) {
    return { message: "Email and password are required" };
  }

  if (
    email !== adminCredentials.email ||
    password !== adminCredentials.password
  ) {
    return {
      message: "Invalid admin credentials. Please try again.",
    };
  }

  const sessionData = {
    id: adminCredentials.id,
    email: adminCredentials.email,
    userType: "admin",
    timestamp: new Date().toISOString(),
  };

  const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString(
    "base64"
  );

  cookieStore.set("admin_session", sessionToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect("/admin");
}

export async function staffLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();

  // Validate inputs
  if (!email || !password) {
    return { message: "Email and password are required" };
  }

  // Find matching staff credentials
  const staff = staffCredentials.find(
    (cred) => cred.email === email && cred.password === password
  );
  console.log(staff);

  if (!staff) {
    console.log("staff error");
    return {
      message: "Invalid credentials. Please check your email and password.",
    };
  }

  // Create staff session with more secure approach
  const sessionData = {
    id: staff.id,
    email: staff.email,
    name: staff.name,
    role: staff.role,
    userType: "staff",
    timestamp: new Date().toISOString(),
  };

  // Encrypt session data (in real app, use proper encryption)
  const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString(
    "base64"
  );

  // Set session cookie
  cookieStore.set("staff_session", sessionToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  // Redirect to staff dashboard
  redirect("/admin");
}

// Optional: Helper function to validate staff session
export async function validateStaffSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("staff_session")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionToken, "base64").toString()
    );

    // Verify session data structure
    if (sessionData.userType !== "staff") {
      return null;
    }

    // Optional: Check if session is expired
    const sessionTime = new Date(sessionData.timestamp);
    const now = new Date();
    const hoursDiff =
      (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 8) {
      // Session expired after 8 hours
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error("Session parsing error:", error);
    return null;
  }
}

// Optional: Logout function
export async function staffLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("staff_session");
  redirect("/login");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/login");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  cookieStore.delete("staff_session");
  redirect("/login");
}

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
