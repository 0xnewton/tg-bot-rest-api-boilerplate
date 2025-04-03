import { Telegraf, Context } from "telegraf";
import * as botService from "./service";
import { TelegrafBot } from "./types";
import { tgBotAPIKey } from "../lib/core";

enum Commands {
  start = "start",
  generateAPIKey = "generate_api_key",
}

// Define bot commands (note: parameters are not defined here)
const commands = [
  {
    command: Commands.start,
    description: "Register your account",
  },
  {
    command: Commands.generateAPIKey,
    description: "Generate an API key for our REST API",
  },
];

// Define as a singleton
let bot: TelegrafBot | null = null;

export const getBot = (): TelegrafBot => {
  if (bot) {
    return bot;
  }

  const apiKey = tgBotAPIKey.value();
  if (!apiKey) {
    throw new Error("Telegram bot API key is not set");
  }

  bot = new Telegraf<Context>(apiKey);

  bot.telegram.setMyCommands(commands);

  bot.start(async (ctx: Context) => {
    await botService.signup(ctx);
  });

  bot.command(Commands.generateAPIKey, async (ctx: Context) => {
    await botService.generateAPIKey(ctx);
  });

  return bot;
};
