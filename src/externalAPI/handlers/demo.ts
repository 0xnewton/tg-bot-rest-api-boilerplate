import { logger } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v2/https";
import { APIRequest, APIResponse } from "../types";
import { wrapHandler } from "./wrapper";

const demo = onRequest(
  async (request: APIRequest, response: APIResponse): Promise<void> => {
    logger.info("Demo request", { request: request.body });
  }
);

export default wrapHandler(demo);
