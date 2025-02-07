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

type TelegrafBot = Telegraf<Context>;

// Define as a singleton
let bot: TelegrafBot | null = null;

export const initializeBot = (apiKey: string): TelegrafBot => {
  if (bot) {
    return bot;
  }

  bot = new Telegraf<Context>(apiKey);

  bot.telegram.setMyCommands(commands);

  bot.start(async (ctx: Context) => {
    await botService.signup(ctx);
  });

  return bot;
};
