import { logger } from "firebase-functions";
import { APIRequest, APIResponse, APINextFunction } from "../types";
import * as apiKeyService from "../../apiKeys/service";

export const validateAPIKey = async (
  req: APIRequest,
  res: APIResponse,
  next: APINextFunction
) => {
  logger.info("Validating API Key");
  const apiKey = req.headers["x-api-key"];

  if (typeof apiKey !== "string") {
    logger.info("API key is not a string in request", { type: typeof apiKey });
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const { organization } = await apiKeyService.validate(apiKey);
    req.organization = organization;
  } catch (err) {
    logger.debug("Error validating API key", { error: err });
    res.status(401).send("Unauthorized");
    return;
  }

  next();
};
