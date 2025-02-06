import { CollectionReference } from "firebase-admin/firestore";
import { DBCollections, OrganizationID, UserID } from "../types";
import { db } from "./platform";
import { User } from "../../users/types";
import { Organization } from "../../organizations/types";

export const getUserCollection = () => {
  return db.collection(DBCollections.Users) as CollectionReference<User>;
};

export const getUserRef = (id: UserID) => {
  return getUserCollection().doc(id);
};

export const getOrganizationCollection = () => {
  return db.collection(
    DBCollections.Organizations
  ) as CollectionReference<Organization>;
};

export const getOrganizationRef = (id: OrganizationID) => {
  return getOrganizationCollection().doc(id);
};

export const getNewOrganizationRef = () => {
  return getOrganizationCollection().doc();
};
