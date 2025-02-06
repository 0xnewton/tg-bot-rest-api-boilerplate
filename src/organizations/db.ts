import { logger } from "firebase-functions";
import { OrganizationID } from "../lib/types";
import { getOrganizationRef } from "../lib/core";

export const deleteOrganization = async (id: OrganizationID): Promise<void> => {
  logger.info("Deleting organization", { id });
  const docRef = getOrganizationRef(id);
  await docRef.delete();
  return;
};
