import { logger } from "firebase-functions";
import {
  FetchResult,
  OrganizationID,
  TelegramUserID,
  UserID,
} from "../lib/types";
import { User } from "./types";
import {
  db,
  getNewOrganizationRef,
  getUserCollection,
  getUserRef,
} from "../lib/core";
import { Organization } from "../organizations/types";

export const getUserByID = async (
  userID: UserID
): Promise<FetchResult<User> | null> => {
  logger.info("Fetching user by user id", { userID });
  const user = await getUserRef(userID).get();
  const data = user.data();
  if (!user.exists || !data) {
    return null;
  }
  return { data, ref: user.ref };
};

export const getUserByTelegramUserID = async (
  tgUserID: TelegramUserID
): Promise<FetchResult<User> | null> => {
  logger.info("Fetching user by telegram user id", { tgUserID });
  const key: keyof User = "telegramUserID";
  const user = await getUserCollection().where(key, "==", tgUserID).get();
  const docs = user.docs.map((doc) => {
    return { data: doc.data(), ref: doc.ref };
  });
  return docs[0] || null;
};

interface CreateUserParams {
  id: UserID;
  telegramUserID: TelegramUserID;
  telegramUsername: string;
  telegramChatID: number;
  email: string | null;
  name: string | null;
  organizationPayload: {
    name: string;
  };
}
export const createUserWithOrganization = async (
  params: CreateUserParams
): Promise<{
  user: FetchResult<User>;
  organization: FetchResult<Organization>;
}> => {
  logger.info("Creating user", { params });
  const nowTimestamp = Date.now();
  // Run a transaction to batch write users
  const userRef = getUserRef(params.id);
  const organizationRef = getNewOrganizationRef();

  const userBody: User = {
    id: params.id,
    email: params.email,
    name: params.name,
    createdAt: nowTimestamp,
    updatedAt: nowTimestamp,
    deletedAt: null,
    telegramUserID: params.telegramUserID,
    telegramChatID: params.telegramChatID,
    telegramUsername: params.telegramUsername,
  };
  const organizationBody: Organization = {
    id: organizationRef.id as OrganizationID,
    foundingUserID: params.id,
    name: params.organizationPayload.name,
    createdAt: nowTimestamp,
    updatedAt: nowTimestamp,
    deletedAt: null,
  };
  logger.info("User and org payloads", { userBody, organizationBody });
  await db.runTransaction(async (tx) => {
    tx.create(userRef, userBody);
    tx.create(organizationRef, organizationBody);
  });

  return {
    user: {
      data: userBody,
      ref: userRef,
    },
    organization: {
      data: organizationBody,
      ref: organizationRef,
    },
  };
};
