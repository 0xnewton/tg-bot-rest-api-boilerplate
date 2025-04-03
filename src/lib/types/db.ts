import { Brand } from "./utils";

export enum DBCollections {
  Organizations = "Organizations",
  APIKeys = "APIKeys",
  Users = "Users",
}

export type OrganizationID = Brand<string, "OrganizationID">;
export type UserID = Brand<string, "UserID">;
export type APIKeyID = Brand<string, "APIKeyID">;
export type TelegramUserID = Brand<number, "TelegramUserID">;

export type UnixTimestamp = number; // Unix time in ms
