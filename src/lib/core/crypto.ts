import { randomBytes, createHash } from "crypto";
import { apiKeySalt } from "./secrets";
import { logger } from "firebase-functions";

const DEFAULT_API_KEY_BYTES = 32; // number of bytes to use for API key generation

export const hashWithSHA256 = (apiKey: string): string => {
  const salt = apiKeySalt.value();
  if (!salt) {
    logger.error("Misconfiguration issue. Hash salt is not defined");
    throw new Error("API key salt is not defined");
  }
  const hash = createHash("sha256");
  hash.update(salt + apiKey);
  return hash.digest("hex");
};

export const generateAPIKey = (length = DEFAULT_API_KEY_BYTES): string => {
  return randomBytes(length).toString("hex");
};
