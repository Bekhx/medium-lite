import AuthRepository from "../repository/auth.repository";
import { IValidatedRequest } from "../model/request.model/validatedRequest.model";
import { IValidatedRequestBody } from "../model/request.model/validatedRequestBody.model";
import {IUserAuth, IUserRegistration} from "../model/interface/auth.model";
import statusCodes from "http-status-codes";
import { ErrorService } from "../service/error.service";
import bcrypt from 'bcrypt';
import {TokenService} from "../service/token.service";

export default class AuthController {

  static async registration(req: IValidatedRequest<IValidatedRequestBody<IUserRegistration>>, res: any) {
    try {
      // TODO check user for exists
      req.body.password = await bcrypt.hash(req.body.password, 20);
      const userDetails = await AuthRepository.signup();

      const tokenPairs = await TokenService.generate({ id : 1 });

      const response: IUserAuth = {
        ... tokenPairs,
        ... userDetails
      }

      res.cookie('refreshToken', tokenPairs.refreshToken, { maxAge: process.env.JWT_REFRESH_EXPIRE_IN_MILLISECONDS as number | undefined, httpOnly: true })
      return res.status(statusCodes.CREATED).json(response);
    } catch (error: any) {
      console.error('ERRRRROR: ', error);
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

}