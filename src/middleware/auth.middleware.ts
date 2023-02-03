import statusCodes from 'http-status-codes';
import { ErrorEnum } from "../model/enum/error.enum";
import { ErrorService } from "../service/error.service";
import { IRequiredHeaders } from "../model/request.model/header.model";
import AuthRepository from "../repository/auth.repository";
import { IValidatedRequest } from "../model/request.model/validatedRequest.model";
import { TokenService } from "../service/token.service";
import { NextFunction, Response } from "express";

const authMiddleware = async (req: IValidatedRequest<IRequiredHeaders>, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) return ErrorService.error(res, {}, statusCodes.UNAUTHORIZED, ErrorEnum.authorization);

    const userData = await TokenService.verifyAccessToken(accessToken);
    if (!userData) return ErrorService.error(res, {}, statusCodes.UNAUTHORIZED, ErrorEnum.unauthorized);

    const user = await AuthRepository.getUserById(userData.id);
    if (!user) return ErrorService.error(res, {}, statusCodes.UNAUTHORIZED, ErrorEnum.unauthorized);

    req.userId = user.id;
    next();
  } catch (error: any) {
    ErrorService.error(res, error, error.status, error.message);
  }
}

export default authMiddleware;