import StatusCodes from "http-status-codes";
import { ErrorEnum } from "../model/enum/error.enum";
import {Response} from "express";

export class ErrorService {

    static error (res: Response, errors: any, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message: any = null): any {
        console.log(errors, statusCode, message);
        if (!errors) errors = ErrorEnum.invalidData;

        res.status(statusCode).send({
            status: statusCode,
            message: message ?? ErrorEnum.invalidData,
            errors: errors.errors ? errors.errors : errors
        });
    }

}