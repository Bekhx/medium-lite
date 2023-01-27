import { ErrorEnum } from "../model/enum/error.enum";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";

const errorHandler = (err: { error: { details: any; }; }, req: Request, res: Response, next: () => void) => {

  if (err.error && err.error.details) {
    const errors: { [index: string]: any } = {}
    for (const item of err.error.details) {
      errors[`${item.context.key}`] = item.message;
    }

    res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ status: statusCodes.UNPROCESSABLE_ENTITY, message: ErrorEnum.invalidData, errors });
  } else {
    next();
  }

};

export default errorHandler;