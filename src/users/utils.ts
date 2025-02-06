import { TelegramUserID, UserID } from "../lib/types";
import { createHash } from "crypto";

export const generateUserIDFromTelegramID = (
  telegramID: TelegramUserID
): UserID => {
  const hash = createHash("sha256");
  hash.update(telegramID.toString());
  const digest = hash.digest("hex").slice(0, 16);
  return `tg:${digest}:${telegramID}` as UserID;
};
