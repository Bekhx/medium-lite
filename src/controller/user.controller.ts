import UserRepository from '../repository/user.repository';
import { IValidatedRequest } from '../model/request.model/validatedRequest.model';
import statusCodes from 'http-status-codes';
import { ErrorService } from '../service/error.service';
import { IGetAllUsersData, IGetAllUsers } from '../model/interface/user.interface';
import { IValidatedRequestQuery } from '../model/request.model/validatedRequestQuery.model';

export default class UserController {

  static async allUsers(req: IValidatedRequest<IValidatedRequestQuery<IGetAllUsers>>, res: any) {
    try {
      let page: number = 0;
      if (req.query.page > 0) page = req.query.page - 1;

      let size = 10;
      if((req.query.size !== 10) && (req.query.size > 0)) size = req.query.size;

      const allUsersData: IGetAllUsersData = {
        limit: size,
        offset: page * size
      }

      const allUsers = await UserRepository.getAllUsers(allUsersData);

      return res.status(statusCodes.OK).json(allUsers);
    } catch (error: any) {
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

}