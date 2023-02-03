import { Router } from 'express';
import IRoute from '../model/interface/common/route.interface';
import AuthController from '../controller/auth.controller';
import { createValidator } from 'express-joi-validation';
import { login, refreshToken, registration } from "../validation/auth.validate";
import authMiddleware from '../middleware/auth.middleware';

export default class AuthRoute implements IRoute {
  public router: Router;
  public validator;

  constructor() {
    this.router = Router();
    this.validator = createValidator();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/auth/registration', this.validator.body(registration), AuthController.registration);
    this.router.post('/auth/login', this.validator.body(login), AuthController.login);
    this.router.post('/auth/refresh-token', this.validator.body(refreshToken), AuthController.refreshToken);
    this.router.post('/auth/logout', authMiddleware, this.validator.body(refreshToken), AuthController.logout);
  }
}
