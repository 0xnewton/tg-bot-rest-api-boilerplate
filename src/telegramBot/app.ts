import { onRequest } from "firebase-functions/v2/https";
import {
  apiKeyHMACSecret,
  tgBotAPIKey,
  tgWebhookSecretToken,
} from "../lib/core";
import { initializeBot } from "./bot";
import { validateSecretToken } from "./middleware/validateSecretToken";
import { logger } from "firebase-functions";

// Set up webhook for Telegram bot
export const app = onRequest(
  {
    secrets: [tgBotAPIKey, tgWebhookSecretToken, apiKeyHMACSecret],
    minInstances: 1,
  },
  (req, res) => {
    try {
      // Validate API Key
      validateSecretToken(req, tgWebhookSecretToken.value());
    } catch (err: any) {
      logger.debug("Invalid secret token", { err: err?.message });
      res.status(401).send(err.message);
      return;
    }

    const botAPIKey = tgBotAPIKey.value();
    const bot = initializeBot(botAPIKey);
    bot.handleUpdate(req.body);
    res.sendStatus(200);
  }
);
