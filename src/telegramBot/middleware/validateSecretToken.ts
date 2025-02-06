import { Request } from "firebase-functions";

export const validateSecretToken = (req: Request, expectedSecret: string) => {
  const secretInHeader = req.headers["x-telegram-bot-api-secret-token"];
  if (secretInHeader !== expectedSecret) {
    throw new Error("Invalid secret token");
  }

  return;
};
