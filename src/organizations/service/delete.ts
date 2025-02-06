import { logger } from "firebase-functions";
import { OrganizationID } from "../../lib/types";
import { deleteOrganization as deleteOrganizationAPI } from "../db";

interface DeleteOrganizationServiceRequest {
  id: OrganizationID;
}

export const deleteOrganization = async (
  params: DeleteOrganizationServiceRequest
): Promise<void> => {
  logger.info("Delete organization service request", { params });
  await deleteOrganizationAPI(params.id);

  return;
};
