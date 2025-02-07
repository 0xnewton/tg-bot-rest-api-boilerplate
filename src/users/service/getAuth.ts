import { UserRecord } from "firebase-admin/auth";
import { UserID } from "../../lib/types";
import { getUserByID } from "../auth";
import { CustomClaims } from "../types";

interface UserWithClaims {
  user: UserRecord;
  parsedClaims: CustomClaims;
}

export const getAuth = async (
  userID: UserID
): Promise<UserWithClaims | null> => {
  const user = await getUserByID(userID);
  if (!user) {
    return null;
  }
  let parsedClaims: CustomClaims = {
    roles: [],
  };

  if (user.customClaims) {
    parsedClaims = user.customClaims as CustomClaims;
  }

  return {
    user,
    parsedClaims,
  };
};
