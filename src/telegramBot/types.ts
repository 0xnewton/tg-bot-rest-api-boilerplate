import { Context, Telegraf } from "telegraf";
import { CustomClaims, User } from "../users/types";

export type BotContext = Context;
export type TelegrafBot = Telegraf<BotContext>;

export interface UserWithClaims {
  user: User;
  claims: CustomClaims;
}
