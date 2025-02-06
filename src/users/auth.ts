import { logger } from "firebase-functions/v1";
import { auth } from "../lib/core";
import { CustomClaims } from "./types";
import { UserID } from "../lib/types";
import { UserRecord } from "firebase-admin/auth";

interface CreateUserAuthPayload {
  uid: UserID;
  password?: string;
  email?: string;
  name?: string;
}

interface CreateUserAuthParams {
  payload: CreateUserAuthPayload;
}

export const createUser = async (
  params: CreateUserAuthParams
): Promise<UserRecord> => {
  logger.info("Creating user auth record", {
    uid: params.payload.uid,
    email: params.payload.email,
    name: params.payload.name,
  });
  const user = await auth.createUser(params.payload);

  return user;
};

export const deleteUser = async (uid: UserID): Promise<void> => {
  logger.info("Deleting user auth record", { uid });
  await auth.deleteUser(uid);
};

export const updateUserClaims = async (
  uid: UserID,
  claims: CustomClaims
): Promise<void> => {
  logger.info("Updating user claims", { uid, claims });
  await auth.setCustomUserClaims(uid, claims);
};

export const getUserByID = async (uid: UserID): Promise<UserRecord | null> => {
  logger.info("Fetching user by uid", { uid });
  let user: UserRecord | null = null;
  try {
    user = await auth.getUser(uid);
  } catch (err: any) {
    if (err?.code === "auth/user-not-found") {
      return null;
    }
    throw err;
  }

  return user;
};
