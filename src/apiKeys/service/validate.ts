import { logger } from "firebase-functions";
import { hashWithHMAC } from "../../lib/core";
import { getAPIKeyByHash } from "../db";
import * as organizationService from "../../organizations/service";
import { FetchResult } from "../../lib/types";
import { APIKey } from "../types";
import { Organization } from "../../organizations/types";

interface ValidateResponse {
  organization: FetchResult<Organization>;
  key: FetchResult<APIKey>;
}
export const validate = async (apiKey: string): Promise<ValidateResponse> => {
  logger.info("Validating API key", {
    isEmpty: !apiKey || apiKey.length === 0,
  });

  // Hash it
  const hash = hashWithHMAC(apiKey);

  // Look up in the database
  const key = await getAPIKeyByHash({ hash });

  if (!key) {
    logger.info("API key not found", { hash });
    throw new Error("Unauthorized");
  }

  if (key.data.revokedAt) {
    logger.info("API key is revoked", { id: key.data.id });
    throw new Error("Unauthorized");
  }

  logger.info("API key found", {
    id: key.data.id,
    userID: key.data.createdAt,
    organizationID: key.data.organizationID,
  });

  // Fetch the user
  const organization = await organizationService.getByID(
    key.data.organizationID
  );

  if (!organization) {
    logger.error("User not found", { id: key.data.createdBy });
    throw new Error("Unauthorized");
  }

  return { organization, key };
};
