import { Telegraf, Context } from "telegraf";
import * as botService from "./service";

enum Commands {
  start = "start",
}

// Define bot commands (note: parameters are not defined here)
const commands = [
  {
    command: Commands.start,
    description: "Register your account",
  },
];

export const initializeBot = (apiKey: string) => {
  const bot = new Telegraf<Context>(apiKey);

  bot.telegram.setMyCommands(commands);

  bot.start(async (ctx: Context) => {
    await botService.signup(ctx);
  });

  return bot;
};
