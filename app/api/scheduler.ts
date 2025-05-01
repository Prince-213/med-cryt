import { getBaseUrl, getStaffs } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import schedule from "node-schedule";
// Function to check and send email
const checkTasksAndSendEmail = async () => {
  const now = new Date();

  const staffs = await getStaffs();

  staffs.forEach((staff) => {
    staff.tasks.forEach((task) => {
      if (task.status === "pending") {
        const taskDateTime = new Date(`${task.date}T${task.time}:00`);
        const diffMinutes = Math.floor(
          (taskDateTime.getTime() - now.getTime()) / 60000
        );

        // If the task is 15 minutes away
        if (
          diffMinutes === 10 ||
          diffMinutes === 15 ||
          diffMinutes === 20 ||
          diffMinutes === 5
        ) {
          sendEmailReminder(staff.email, staff.name);
        }
      }
    });
  });
};

const sendEmailReminder = async (email: string, name: string) => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        message: `Hello ${name} you have a pending task close to deadline. Please respond to this task as quick as possible.`
      })
    });

    if (response.ok) {
      console.log("Email sent successfully!");
    } else {
      const errorDetails = await response.json();
      console.error("Error sending email:", errorDetails.message);
    }
  } catch (error) {
    console.error("There was a problem sending the email:", error);
  }
};

// Schedule the email every 5 minutes
schedule.scheduleJob("*/5 * * * *", checkTasksAndSendEmail);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Scheduler is running!" });
}
