import { logger } from "firebase-functions";
import { Context } from "telegraf";
import * as userService from "../../users/service";
import { UserExistsError } from "../../users/errors";
import { TelegramUserID } from "../../lib/types";

export const signup = async (ctx: Context) => {
  ctx.reply("Welcome to Shark Pay!");

  logger.info("Start / signup command received", { ctx });
  const userID = ctx.from?.id;
  const userName = ctx.from?.username;
  const chatID = ctx.chat?.id;

  if (!userID || !userName || !chatID) {
    logger.info("Unable to retrieve user details", { ctx });
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
  } catch (err) {
    if (err instanceof UserExistsError) {
      // User already exists
      logger.info("User already exists", { ctx });
    } else {
      logger.error("Error creating user", { ctx, err });
      ctx.reply("Something went wrong. Please try again.");
    }
    return;
  }

  ctx.reply("Your account has been set up successfully!");
};
