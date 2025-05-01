"use client";

import { decryptString } from "@/lib/utils";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { BiMailSend, BiMap, BiUserCircle } from "react-icons/bi";
import { toast } from "sonner";

const PatientSlug = ({ patientData }: { patientData: Patient | null }) => {
  const [patient, setPatient] = useState({
    adress: patientData?.adress || "",
    heart: patientData?.vitalSigns[0]?.heartRate || "",
    bloodPressure: patientData?.vitalSigns[0]?.bloodPressure || "",
    temperature: patientData?.vitalSigns[0]?.temperature || "",
    height: patientData?.vitalSigns[0]?.height || "",
    weight: patientData?.vitalSigns[0]?.weight || "",
    bmi: patientData?.vitalSigns[0]?.bmi || ""
  });

  const [decryptKey, setDecryptKey] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const decryptInfo = async () => {
    setLoading(true);
    try {
      if (!decryptKey || decryptKey !== patientData?.kd) {
        toast.error("Invalid decryption key.");
        return;
      }

      // Decrypt each field if it exists
      const decryptedFields = await Promise.all([
        patient.heart ? decryptString(patient.heart, decryptKey) : "",
        patient.adress ? decryptString(patient.adress, decryptKey) : "",
        patient.bloodPressure
          ? decryptString(patient.bloodPressure, decryptKey)
          : "",
        patient.temperature
          ? decryptString(patient.temperature, decryptKey)
          : "",
        patient.height ? decryptString(patient.height, decryptKey) : "",
        patient.weight ? decryptString(patient.weight, decryptKey) : "",
        patient.bmi ? decryptString(patient.bmi, decryptKey) : ""
      ]);

      // Update state with decrypted values
      setPatient((prev) => ({
        ...prev,
        heart: decryptedFields[0],
        adress: decryptedFields[1],
        bloodPressure: decryptedFields[2],
        temperature: decryptedFields[3],
        height: decryptedFields[4],
        weight: decryptedFields[5],
        bmi: decryptedFields[6]
      }));

      toast.success("Decryption successful!");
    } catch (error) {
      console.error("Decryption error:", error);
      toast.error("Decryption failed. Please check the key and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Log patient state changes
  useEffect(() => {
    console.log("Patient state updated:", patient);
  }, [patient]);

  return (
    <div className="w-[80%]">
      <Modal show={open} size="md" popup onClose={() => setOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Enter your Decryption Key
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="key" value="Your key" />
              </div>
              <TextInput
                id="key"
                onChange={(e) => setDecryptKey(e.target.value)}
                placeholder="Enter decryption key"
                required
                disabled={loading}
              />
            </div>
            <Button onClick={decryptInfo} disabled={loading}>
              {loading ? "Decrypting..." : "Decrypt"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="pb-5 border-b-2 w-full flex items-center justify-between border-gray-100">
        <h1 className="font-medium text-2xl">Patient Data</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-300 text-black px-8 py-4 rounded-md"
        >
          Decrypt
        </button>
      </div>
      <div className="flex items-center py-5 space-x-2 border-b-2 border-gray-100">
        <BiUserCircle size={42} />
        <div>
          <h3 className="font-medium text-xl">
            <h2>{patientData?.name}</h2>
            <p className="text-gray-400 font-medium">
              Gender: {patientData?.gender}
            </p>
          </h3>
        </div>
      </div>
      <div className="flex items-center py-5 space-x-2 border-b-2 border-gray-100">
        <div className="border-2 flex items-center space-x-2 p-4 rounded-lg">
          <BiMailSend size={24} />
          <p>{patientData?.email}</p>
        </div>
        <div className="border-2 flex items-center space-x-2 p-4 rounded-lg">
          <BiMap size={24} />
          <p>{patient.adress}</p>
        </div>
      </div>
      <div className="py-5 border-b-2 border-gray-100">
        <h1 className="font-medium text-lg">Vital Data</h1>
        <div className="w-full border-2 border-gray-300 rounded-md bg-green-50">
          <div className="w-full px-4 py-2 border-b-2 border-dashed">
            Medicals
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-10">
            <div>
              <p>Heart Rate</p>
              <p className="truncate">{patient.heart}</p>
            </div>
            <div>
              <p>Blood Pressure</p>
              <p className="truncate">{patient.bloodPressure}</p>
            </div>
            <div>
              <p>Temperature</p>
              <p className="truncate">{patient.temperature}</p>
            </div>
            <div>
              <p>Height</p>
              <p className="truncate">{patient.height}</p>
            </div>
            <div>
              <p>Weight</p>
              <p className="truncate">{patient.weight}</p>
            </div>
            <div>
              <p>BMI</p>
              <p className="truncate">{patient.bmi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSlug;
