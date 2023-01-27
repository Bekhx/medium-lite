import express, { Request, Response, NextFunction, Express } from 'express';
import * as BodyParser from 'body-parser';
import Cors from 'cors';
import morgan from 'morgan';
import * as Http from "http";
import errorHandler from "./middleware/errorHandler";
import IRoute from "./model/interface/common/route.interface";
import path from "path";

export default class App {

  public host;
  public port;
  public http: Http.Server | undefined;
  public app: Express;

  constructor(routes: IRoute[]) {
    this.host = process.env.HOST;
    this.port = process.env.PORT || 3001;
    this.app = express();
    this.start(routes);
  }

  private start(routes: IRoute[]) {
    this.app.use(BodyParser.json({limit: '50mb'}));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(Cors());
    this.app.use(morgan("combined"))
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    this.app.use('/files', express.static('uploads'));
    this.app.use(errorHandler)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Expose-Headers', 'original-name, Content-Disposition');
      next();
    });

    for ( const route of routes) {
      this.app.use('/', route.router);
    }

    this.http = Http.createServer(this.app);

    this.http.listen(
      this.port,
      () => console.log(`Server running on http://${this.host}:${this.port}`)
    )
  }
};