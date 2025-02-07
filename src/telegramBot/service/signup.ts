import { logger } from "firebase-functions";
import * as userService from "../../users/service";
import { UserExistsError } from "../../users/errors";
import { TelegramUserID } from "../../lib/types";
import { BotContext } from "../types";

export const signup = async (ctx: BotContext) => {
  ctx.reply("Welcome to Shark Pay!");

  const userID = ctx.from?.id;
  const userName = ctx.from?.username;
  const chatID = ctx.chat?.id;
  logger.info("Start / signup command received", { userID, userName, chatID });

  if (!userID || !userName || !chatID) {
    logger.info("Unable to retrieve user details", {
      userID,
      userName,
      chatID,
    });
    ctx.reply("Unable to retrieve your user details. Please try again.");
    return;
  }

  // Check if user exists
  try {
    await userService.createByTelegram(
      {
        telegramUserID: userID as TelegramUserID,
        telegramUsername: userName,
        telegramChatID: chatID,
      },
      { tgContext: ctx }
    );
  } catch (err: any) {
    if (err instanceof UserExistsError) {
      // User already exists
      logger.info("User already exists", { userID });
    } else {
      logger.error("Error creating user", {
        errDetails: err?.message,
        code: err?.code,
      });
      ctx.reply("Something went wrong. Please try again.");
    }
    return;
  }

  ctx.reply("Your account has been set up successfully!");
};
