interface Patient {
  id: string;
  kd: string;
  vitalSigns: VitalSigns[];
  email: string;
  name: string;
  age: string;
  adress: string; // Note: Likely a typo, should be "address"
  gender: string;
}

interface Threat {
  id: string;
  name: string;
  time: string;
}

interface VitalSigns {
  id: string;
  patientId: string;
  Patient?: Patient; // Optional relation (only present when joined)
  recordedAt: Date;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  height: string | null;
  weight: string | null;
  bmi: string | null;
}
