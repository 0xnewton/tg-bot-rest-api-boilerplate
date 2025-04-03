import { logger } from "firebase-functions";
import { tgWebhookSecretToken } from "../../lib/core";
import { Request, Response, NextFunction } from "express";

export const validateSecretToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretInHeader = req.headers["x-telegram-bot-api-secret-token"];
  const expectedSecret = tgWebhookSecretToken.value();
  if (!expectedSecret) {
    logger.error("Expected secret token is not set");
    throw new Error("Unauthorized");
  }
  if (secretInHeader !== expectedSecret) {
    logger.error("Invalid secret token");
    throw new Error("Unauthorized");
  }

  next();
};
