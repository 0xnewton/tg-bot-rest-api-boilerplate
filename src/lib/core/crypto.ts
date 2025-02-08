import { randomBytes, createHmac } from "crypto";
import { apiKeyHMACSecret } from "./secrets";
import { logger } from "firebase-functions";

const DEFAULT_API_KEY_BYTES = 32; // number of bytes to use for API key generation

export const generateAPIKey = (length = DEFAULT_API_KEY_BYTES): string => {
  return randomBytes(length).toString("hex");
};

export const hashWithHMAC = (apiKey: string): string => {
  const secret = apiKeyHMACSecret.value();
  if (!secret) {
    logger.error("Misconfiguration issue. HMAC secret is not defined");
    throw new Error("Something wen't wrong!");
  }
  const hmac = createHmac("sha256", secret);
  hmac.update(apiKey);
  return hmac.digest("hex");
};
