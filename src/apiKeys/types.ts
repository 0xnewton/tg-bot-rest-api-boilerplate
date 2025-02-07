import { OrganizationID, UnixTimestamp, UserID } from "../lib/types";

export type APIKeyID = string;

export interface APIKey {
  id: APIKeyID;
  organizationID: OrganizationID;
  hash: string;
  createdBy: UserID;
  createdAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
  revokedAt: UnixTimestamp | null;
}
