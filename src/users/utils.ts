import { TelegramUserID, UserID } from "../lib/types";
import { createHash } from "crypto";
import { Role, UserRole } from "./types";

export const generateUserIDFromTelegramID = (
  telegramID: TelegramUserID
): UserID => {
  const hash = createHash("sha256");
  hash.update(telegramID.toString());
  const digest = hash.digest("hex").slice(0, 16);
  return `tg:${digest}:${telegramID}` as UserID;
};

export const isReadableRole = (role: UserRole): boolean => {
  if ([Role.Admin, Role.Editor, Role.Viewer].includes(role.role)) {
    return true;
  }

  return false;
};

export const isEditableRole = (role: UserRole): boolean => {
  if ([Role.Admin, Role.Editor].includes(role.role)) {
    return true;
  }

  return false;
};
