import { TelegramUserID, UserID } from "../lib/types";

export class UserExistsError extends Error {
  name = "UserExistsError";
  userID: UserID;

  constructor(message: string, userID: UserID) {
    super(message); // Pass the message to the parent Error class
    this.userID = userID;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}

export class TGUserNotFoundError extends Error {
  name = "UserNotFoundError";
  userID: UserID;
  tgUserID: TelegramUserID;

  constructor(message: string, userID: UserID, tgUserID: TelegramUserID) {
    super(message); // Pass the message
    this.userID = userID;
    this.tgUserID = tgUserID;
  }
}
