import AuthRepository from "../repository/auth.repository";
import { IValidatedRequest } from "../model/request.model/validatedRequest.model";
import { IValidatedRequestBody } from "../model/request.model/validatedRequestBody.model";
import { ILogin, IUserAuth, IUserRegistration } from "../model/interface/auth.interface";
import statusCodes from "http-status-codes";
import { ErrorService } from "../service/error.service";
import bcrypt from 'bcrypt';
import { TokenService } from "../service/token.service";
import { ErrorEnum } from "../model/enum/error.enum";

export default class AuthController {

  static async registration(req: IValidatedRequest<IValidatedRequestBody<IUserRegistration>>, res: any) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const userCheck = await AuthRepository.checkUserByEmail(email);
      if (userCheck) return ErrorService.error(res, {}, statusCodes.CONFLICT, ErrorEnum.userAlreadyExists);

      req.body.password = await bcrypt.hash(password, 8);
      const user = await AuthRepository.create(req.body);

      const tokenPairs = await TokenService.generate({ id: user.id });

      const response: IUserAuth = {
        ... user,
        ... tokenPairs
      }

      res.cookie('refreshToken', tokenPairs.refreshToken, { maxAge: process.env.JWT_REFRESH_EXPIRE_IN_MILLISECONDS as number | undefined, httpOnly: true })
      return res.status(statusCodes.CREATED).json(response);
    } catch (error: any) {
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

  static async login(req: IValidatedRequest<IValidatedRequestBody<ILogin>>, res: any) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const userByEmail = await AuthRepository.checkUserByEmail(email);
      if (!userByEmail) return ErrorService.error(res, {}, statusCodes.UNAUTHORIZED, ErrorEnum.userEmailNotFound);

      const isPassword = userByEmail.password ? await bcrypt.compare(password, userByEmail.password) : null;
      if (!isPassword) return ErrorService.error(res, {}, statusCodes.UNAUTHORIZED, ErrorEnum.invalidPassword);

      const tokenPairs = await TokenService.generate({ id: userByEmail.id });

      delete userByEmail.password;

      const response: IUserAuth = {
        ...userByEmail,
        ... tokenPairs
      }

      res.cookie('refreshToken', tokenPairs.refreshToken, { maxAge: process.env.JWT_REFRESH_EXPIRE_IN_MILLISECONDS as number | undefined, httpOnly: true })
      return res.status(statusCodes.OK).json(response);
    } catch (error: any) {
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

}