import { credential, initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFunctions } from "firebase-admin/functions";

const app = initializeApp({
  credential: credential.applicationDefault(),
});

export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);
