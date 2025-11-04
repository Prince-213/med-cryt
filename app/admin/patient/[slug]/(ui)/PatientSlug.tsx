"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { BiMailSend, BiMap, BiUserCircle } from "react-icons/bi";
import { toast } from "sonner";
import { addThreat } from "@/lib/actions";
import { decryptString, getBaseUrl } from "@/lib/utils";

interface PatientSlugProps {
  patientData: Patient | null;
}

const PatientSlug: React.FC<PatientSlugProps> = ({ patientData }) => {
  const [patient, setPatient] = useState(() => ({
    adress: patientData?.adress || "",
    heart: patientData?.vitalSigns?.[0]?.heartRate || "",
    bloodPressure: patientData?.vitalSigns?.[0]?.bloodPressure || "",
    temperature: patientData?.vitalSigns?.[0]?.temperature || "",
    height: patientData?.vitalSigns?.[0]?.height || "",
    weight: patientData?.vitalSigns?.[0]?.weight || "",
    bmi: patientData?.vitalSigns?.[0]?.bmi || "",
  }));

  const [decryptKey, setDecryptKey] = useState("");
  const [openKeyModal, setOpenKeyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpExpired, setOtpExpired] = useState(false);

  /** -------------------- 🔹 Helper: Send OTP -------------------- **/
  const sendOtp = useCallback(
    async (name: string, email: string, otp: string) => {
      try {
        const response = await fetch(`${getBaseUrl()}/api/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            message: `Your one-time OTP is ${otp}`,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to send email");
        }

        toast.success("OTP sent successfully!");
        return true;
      } catch (error) {
        console.error("Email send error:", error);
        toast.error("Failed to send OTP. Please try again.");
        return false;
      }
    },
    []
  );

  const sendSuspiciousLoginAlert = useCallback(
    async (name: string, email: string) => {
      try {
        const response = await fetch(`${getBaseUrl()}/api/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            subject: "⚠️ Suspicious Login Activity Detected",
            message: `
Hello ${name},

We detected a suspicious login attempt on your account.



🕒 **Time:** ${new Date().toLocaleString()}

If this was you, you can safely ignore this message.  


Stay safe,  
— The Security Team
          `,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to send alert email");
        }

        return true;
      } catch (error) {
        console.error("Email send error:", error);
        return false;
      }
    },
    []
  );

  /** -------------------- 🔹 Helper: Generate OTP -------------------- **/
  const generateOtp = useCallback(async () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    const sent = await sendOtp(
      patientData?.name ?? "",
      patientData?.email ?? "",
      newOtp
    );

    if (sent) {
      setOtp("");
      setOtpModalOpen(true);
      setOtpTimer(60);
      setOtpExpired(false);
    }
  }, [patientData, sendOtp]);

  /** -------------------- 🔹 OTP Countdown -------------------- **/
  useEffect(() => {
    if (!otpModalOpen) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setOtpExpired(true);
          toast.error("OTP has expired. Please try again.");
          setTimeout(() => setOtpModalOpen(false), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpModalOpen]);

  /** -------------------- 🔹 Verify Decryption Key -------------------- **/
  const verifyKey = useCallback(async () => {
    if (!decryptKey) return toast.error("Enter a decryption key.");
    setLoading(true);
    try {
      if (decryptKey !== patientData?.kd) {
        await addThreat(patientData?.name ?? "");
        toast.error("Invalid decryption key.");
        await sendSuspiciousLoginAlert(
          patientData?.name ?? "",
          patientData?.email ?? ""
        );
        return;
      }

      // ✅ Key is correct → generate and send OTP
      toast.success("Key verified! Sending OTP...");
      setOpenKeyModal(false);
      await generateOtp();
    } catch (error) {
      console.error("Key verification error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [decryptKey, patientData, generateOtp, sendSuspiciousLoginAlert]);

  /** -------------------- 🔹 Decrypt Patient Info -------------------- **/
  const decryptInfo = useCallback(async () => {
    setLoading(true);
    try {
      const decryptedValues = await Promise.all([
        decryptString(patient.heart, decryptKey),
        decryptString(patient.adress, decryptKey),
        decryptString(patient.bloodPressure, decryptKey),
        decryptString(patient.temperature, decryptKey),
        decryptString(patient.height, decryptKey),
        decryptString(patient.weight, decryptKey),
        decryptString(patient.bmi, decryptKey),
      ]);

      setPatient({
        heart: decryptedValues[0],
        adress: decryptedValues[1],
        bloodPressure: decryptedValues[2],
        temperature: decryptedValues[3],
        height: decryptedValues[4],
        weight: decryptedValues[5],
        bmi: decryptedValues[6],
      });

      toast.success("Decryption successful!");
    } catch (error) {
      console.error("Decryption error:", error);
      await addThreat(patientData?.name ?? "");
      toast.error("Decryption failed. Please check the key and try again.");
    } finally {
      setLoading(false);
    }
  }, [decryptKey, patient, patientData]);

  /** -------------------- 🔹 Verify OTP -------------------- **/
  const verifyOtp = useCallback(() => {
    if (otpExpired)
      return toast.error("OTP has expired. Please request again.");
    if (otp !== generatedOtp)
      return toast.error("Wrong OTP. Please try again.");

    decryptInfo();
    setOtpModalOpen(false);
    setDecryptKey("");
    setOtp("");
  }, [otp, generatedOtp, decryptInfo, otpExpired]);

  /** -------------------- 🔹 Render -------------------- **/
  return (
    <div className="w-[80%]">
      {/* 🔸 OTP Modal */}
      <Modal
        show={otpModalOpen}
        size="md"
        popup
        onClose={() => !otpExpired && setOtpModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Enter the OTP sent to your email.
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                OTP expires in:
              </p>
              <p
                className={`text-lg font-bold ${
                  otpTimer <= 10 ? "text-red-500" : "text-green-500"
                }`}
              >
                {otpTimer}s
              </p>
            </div>

            <div>
              <Label
                htmlFor="otp"
                value="Enter 6-digit OTP"
                className="mb-2 block"
              />
              <TextInput
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                required
                disabled={loading || otpExpired}
              />
            </div>

            <Button
              onClick={verifyOtp}
              disabled={loading || otpExpired || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* 🔸 Decryption Key Modal */}
      <Modal
        show={openKeyModal}
        size="md"
        popup
        onClose={() => setOpenKeyModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Enter your Decryption Key
            </h3>
            <div>
              <Label htmlFor="key" value="Your key" className="mb-2 block" />
              <TextInput
                id="key"
                onChange={(e) => setDecryptKey(e.target.value)}
                placeholder="Enter decryption key"
                required
                disabled={loading}
              />
            </div>
            <Button onClick={verifyKey} disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* 🔸 Patient Data Section */}
      <div className="pb-5 border-b-2 w-full flex items-center justify-between border-gray-100">
        <h1 className="font-medium text-2xl">Patient Data</h1>
        <button
          onClick={() => setOpenKeyModal(true)}
          className="bg-yellow-300 text-black px-8 py-4 rounded-md"
        >
          Decrypt
        </button>
      </div>

      {/* 🔸 Patient Info */}
      <div className="flex items-center py-5 space-x-2 border-b-2 border-gray-100">
        <BiUserCircle size={42} />
        <div>
          <h2 className="font-medium text-xl">{patientData?.name}</h2>
          <p className="text-gray-400 font-medium">
            Gender: {patientData?.gender}
          </p>
        </div>
      </div>

      {/* 🔸 Contact Info */}
      <div className="flex items-center py-5 space-x-2 border-b-2 border-gray-100">
        <div className="border-2 flex items-center space-x-2 p-4 rounded-lg">
          <BiMailSend size={24} />
          <p>{patientData?.email}</p>
        </div>
        <div className="border-2 max-w-[80%] flex items-center space-x-2 p-4 rounded-lg">
          <BiMap size={24} />
          <p className="truncate">{patient.adress}</p>
        </div>
      </div>

      {/* 🔸 Vital Data */}
      <div className="py-5 border-b-2 border-gray-100">
        <h1 className="font-medium text-lg mb-2">Vital Data</h1>
        <div className="w-full border-2 border-gray-300 rounded-md bg-green-50">
          <div className="w-full px-4 py-2 border-b-2 border-dashed font-medium">
            Medicals
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-8">
            {[
              ["Heart Rate", patient.heart, "bpm"],
              ["Blood Pressure", patient.bloodPressure, "/80 mmHg"],
              ["Temperature", patient.temperature, "°C"],
              ["Height", patient.height, "cm"],
              ["Weight", patient.weight, "kg"],
              ["BMI", patient.bmi, "kg/m²"],
            ].map(([label, value, unit]) => (
              <div key={label}>
                <p>{label}</p>
                <p className="truncate">{value ? `${value} ${unit}` : "—"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSlug;
