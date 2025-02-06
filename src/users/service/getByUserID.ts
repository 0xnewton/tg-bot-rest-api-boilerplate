import { logger } from "firebase-functions";
import { FetchResult, UserID } from "../../lib/types";
import { getUserByID } from "../db";
import { User } from "../types";

export const getByUserID = async (
  userID: UserID
): Promise<FetchResult<User> | null> => {
  logger.info("Fetching user by user id", { userID });
  const user = await getUserByID(userID);

  return user;
};
