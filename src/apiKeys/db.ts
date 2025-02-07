import { logger } from "firebase-functions";
import { getAPIKeyCollectionGroup, getAPIKeyCollection } from "../lib/core";
import { FetchResult, OrganizationID, UserID } from "../lib/types";
import { APIKey } from "./types";

interface CreateAPIKeyParams {
  organizationID: OrganizationID;
  createdBy: UserID;
  hash: string;
}

export const createAPIKey = async (
  params: CreateAPIKeyParams
): Promise<FetchResult<APIKey>> => {
  logger.info("Create API in database", { params });
  const collection = getAPIKeyCollection(params.organizationID);
  const docRef = collection.doc();
  const body: APIKey = {
    id: docRef.id,
    hash: params.hash,
    organizationID: params.organizationID,
    createdBy: params.createdBy,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    revokedAt: null,
  };

  await docRef.create(body);

  return {
    data: body,
    ref: docRef,
  };
};

interface GetAPIKeyByHashParams {
  hash: string;
}
export const getAPIKeyByHash = async (
  params: GetAPIKeyByHashParams
): Promise<FetchResult<APIKey> | null> => {
  logger.info("Fetch API by hash", { params });
  const key: keyof APIKey = "hash";
  const apiKey = await getAPIKeyCollectionGroup()
    .where(key, "==", params.hash)
    .get();
  const docs = apiKey.docs.map((doc) => {
    return { data: doc.data(), ref: doc.ref };
  });
  return docs[0] || null;
};

export const getAPIKeyCount = async (
  organizationID: OrganizationID
): Promise<number> => {
  const collection = getAPIKeyCollection(organizationID);
  const aggCount = collection.count();
  const snapshot = await aggCount.get();
  return snapshot.data().count;
};
