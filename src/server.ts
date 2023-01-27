import * as dotenv from 'dotenv';
dotenv.config();
import App from './app';
import IRoute from "./model/interface/common/route.interface";
import IndexRoute from "./route/index.route";
import AuthRoute from "./route/auth.route";

const routes: IRoute[] = [
  new IndexRoute(),
  new AuthRoute()
];

new App(routes);