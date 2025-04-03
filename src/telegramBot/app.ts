import { onRequest } from "firebase-functions/v2/https";
import {
  apiKeyHMACSecret,
  tgBotAPIKey,
  tgWebhookSecretToken,
} from "../lib/core";
import { getBot } from "./bot";
import { validateSecretToken } from "./middleware/validateSecretToken";
import * as express from "express";

const expressApp = express();
expressApp.use(express.json());
expressApp.use(validateSecretToken);

expressApp.use(async (req, res, next) => {
  const bot = getBot();
  try {
    const webhookMiddleware = await bot.createWebhook({
      domain: "https://your-domain.com",
      secret_token: tgWebhookSecretToken.value(),
    });
    // Mount the webhook middleware so that future requests get processed
    expressApp.use(webhookMiddleware);
  } catch (error) {
    console.error("Error creating webhook:", error);
    res.status(500).send("Error initializing bot webhook");
    return;
  }
  next();
});

// Set up webhook for Telegram bot
export const app = onRequest(
  {
    secrets: [tgBotAPIKey, tgWebhookSecretToken, apiKeyHMACSecret],
    minInstances: 1,
  },
  expressApp
);
