import { Request, Response, Router } from 'express';
import IRoute from '../model/interface/common/route.interface';
import { StatusCodes} from 'http-status-codes';

export default class IndexRoute implements IRoute {
  public path;
  public router;

  constructor() {
    this.path = `/`;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, (req: Request, res: Response) => {
      res.status(StatusCodes.OK).json({
        message: 'Server is running!'
      });
    });
  }
}
