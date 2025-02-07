import { Organization } from "../organizations/types";
import { Request, Response, NextFunction } from "express";

export interface APIRequest extends Request {
  organization?: Organization;
}
export type APIResponse = Response;
export type APINextFunction = NextFunction;
