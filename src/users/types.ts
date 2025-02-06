import { OrganizationID, UnixTimestamp, UserID } from "../lib/types";

export interface User {
  id: UserID;
  email: string | null;
  name: string | null;
  createdAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
  deletedAt: UnixTimestamp | null;
  telegramUserID: number | null;
  telegramChatID: number | null;
  telegramUsername: string | null;
}

export enum Role {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}
export interface UserRole {
  role: Role;
  userID: UserID;
  organizationID: OrganizationID;
}

export interface CustomClaims {
  roles: UserRole[];
}
