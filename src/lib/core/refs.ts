import { CollectionGroup, CollectionReference } from "firebase-admin/firestore";
import { DBCollections, OrganizationID, UserID, APIKeyID } from "../types";
import { db } from "./platform";
import { User } from "../../users/types";
import { Organization } from "../../organizations/types";
import { APIKey } from "../../apiKeys/types";

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

export const getAPIKeyCollection = (organizationID: OrganizationID) => {
  return getOrganizationRef(organizationID).collection(
    DBCollections.APIKeys
  ) as CollectionReference<APIKey>;
};

export const getAPIKeyDoc = (organizationID: OrganizationID, id: APIKeyID) => {
  return getAPIKeyCollection(organizationID).doc(id);
};

export const getAPIKeyCollectionGroup = () => {
  return db.collectionGroup(DBCollections.APIKeys) as CollectionGroup<APIKey>;
};
