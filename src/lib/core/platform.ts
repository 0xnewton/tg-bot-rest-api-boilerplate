import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFunctions } from "firebase-admin/functions";

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
