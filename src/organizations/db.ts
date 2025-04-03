import { logger } from "firebase-functions";
import { OrganizationID } from "../lib/types";
import { getOrganizationRef } from "../lib/core";
import { Organization } from "./types";

export const deleteOrganization = async (id: OrganizationID): Promise<void> => {
  logger.info("Deleting organization", { id });
  const docRef = getOrganizationRef(id);
  await docRef.delete();
  return;
};

export const getOrganizationByID = async (
  id: OrganizationID
): Promise<Organization | null> => {
  logger.info("Getting organization by ID", { id });
  const docRef = getOrganizationRef(id);
  const doc = await docRef.get();
  const data = doc.data();
  if (!doc.exists || !data) {
    logger.error("Organization not found", { id });
    return null;
  }
  return data;
};
