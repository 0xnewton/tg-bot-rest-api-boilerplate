import { Request, Response } from "express";
import {
  HttpsFunction,
  Request as FirebaseResquest,
} from "firebase-functions/v2/https";

// See https://github.com/firebase/firebase-functions/issues/417#issuecomment-500657318
export const wrapHandler = (handler: HttpsFunction) => {
  return async (req: Request, res: Response) =>
    // Note this is only for typescript, the handler will still work without this but type errors will be thrown
    handler(req as FirebaseResquest, res);
};
