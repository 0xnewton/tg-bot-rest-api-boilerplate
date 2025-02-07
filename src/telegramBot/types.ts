import { Context, Telegraf } from "telegraf";
import { FetchResult } from "../lib/types";
import { CustomClaims, User } from "../users/types";

export type BotContext = Context;
export type TelegrafBot = Telegraf<BotContext>;

export interface UserWithClaims {
  user: FetchResult<User>;
  claims: CustomClaims;
}
