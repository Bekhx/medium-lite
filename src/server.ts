import * as dotenv from 'dotenv';
dotenv.config();
import App from './app';
import IRoute from './model/interface/common/route.interface';
import IndexRoute from './route/index.route';
import AuthRoute from './route/auth.route';
import UserRoute from './route/user.route';
import PostRoute from './route/post.route';

const routes: IRoute[] = [
  new IndexRoute(),
  new AuthRoute(),
  new UserRoute(),
  new PostRoute()
];

new App(routes);