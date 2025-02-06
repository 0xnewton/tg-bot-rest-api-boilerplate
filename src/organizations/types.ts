import { OrganizationID, UnixTimestamp, UserID } from "../lib/types";

export interface Organization {
  id: OrganizationID;
  foundingUserID: UserID;
  name: string;
  createdAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
  deletedAt: UnixTimestamp | null;
}
