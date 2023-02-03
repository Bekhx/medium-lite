import { Request } from "express";
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { ParsedQs } from "qs";

export interface  IValidatedRequest<T extends ValidatedRequestSchema> extends Request {
    body: T[ContainerTypes.Body];
    query: T[ContainerTypes.Query] & ParsedQs;
    headers: T[ContainerTypes.Headers];
    params: T[ContainerTypes.Params];
    userId?: number;
    file?: any;
}