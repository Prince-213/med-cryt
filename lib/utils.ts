// Helper functions to convert between Base64 and Uint8Array
function arrayBufferToBase64(buffer: Uint8Array<ArrayBuffer>) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Encrypt a string
export async function encryptString(plaintext: string | undefined, password: string | undefined) {
  const encoder = new TextEncoder();
  const plaintextBytes = encoder.encode(plaintext);

  // Generate a random salt (16 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Import the password as a key material for PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // Derive a key using PBKDF2
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // Generate a random IV (12 bytes for AES-GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the plaintext
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    plaintextBytes
  );

  // Combine salt, IV, and ciphertext into a single array
  const combined = new Uint8Array([
    ...salt,
    ...iv,
    ...new Uint8Array(ciphertext)
  ]);

  // Convert to Base64 for storage/transmission
  return arrayBufferToBase64(combined);
}

// Decrypt a string
export async function decryptString(combinedBase64: string, password: string | undefined) {
  const combined = base64ToArrayBuffer(combinedBase64);

  // Extract salt (first 16 bytes), IV (next 12 bytes), and ciphertext
  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const ciphertext = combined.slice(28);

  const encoder = new TextEncoder();

  // Import the password as key material
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // Derive the key using PBKDF2
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  // Decrypt the ciphertext
  const plaintextBytes = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    ciphertext
  );

  // Convert bytes back to string
  const decoder = new TextDecoder();
  return decoder.decode(plaintextBytes);
}

// Example usage

export const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "dashboard.png"
  }
];

export const getBaseUrl = (): string => {
  const siteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://medical-dash-gamma.vercel.app";

  return siteUrl;
};
