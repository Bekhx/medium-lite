import { Router } from 'express';
import IRoute from '../model/interface/common/route.interface';
import UserController from '../controller/user.controller';
import { createValidator } from 'express-joi-validation';
import authMiddleware from '../middleware/auth.middleware';
import { allUsers } from '../validation/user.validate';

export default class UserRoute implements IRoute {
  public router: Router;
  public validator;

  constructor() {
    this.router = Router();
    this.validator = createValidator();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/user', authMiddleware, this.validator.query(allUsers), UserController.allUsers);
    //  TODO: need to done crud APIs for user!
  }
}
