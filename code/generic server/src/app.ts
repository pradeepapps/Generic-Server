import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { Routes } from "./routes/routes";

class App {

  public app: express.Application;
  public routes: Routes = new Routes();

  public mongoUrl: string = 'mongodb://pradeep:prdp2989@ds261302.mlab.com:61302/userdb';

  constructor() {
    this.app = express();
    this.config();
    this.routes.initialize(this.app);
    this.mongoSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  /**
   * Setup mongodb 
   */
  private mongoSetup(): void {
    const options = {
      useNewUrlParser: true
    };
    mongoose.connect(this.mongoUrl, options);
  }

}

export default new App().app;