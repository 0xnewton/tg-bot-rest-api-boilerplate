import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
import * as cors from "cors";
import { demo } from "./handlers";
import { validateAPIKey, limiter, speedLimiter } from "./middleware";

const app = express();

// General middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.set("trust proxy", 1); // Enables the rate limiting to work behind a proxy (like firebase functions)

// Set up public api routes protected by user api keys
app.use(limiter);
app.use(speedLimiter);
app.use(validateAPIKey);

app.post("/demo", demo);

export const api = onRequest(
  {
    timeoutSeconds: 120,
    secrets: [],
    minInstances: 1,
  },
  app
);
