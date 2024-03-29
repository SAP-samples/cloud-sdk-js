import * as bodyParser from 'body-parser';
import express from 'express';
import { serviceRoute } from './service-endpoint';
import { dependencyRoute } from './dependencies-endpoint';
import { subscribeRoute, unsubscribeRoute } from './subscription-endpoint';
import { join } from 'path';
import { readFileSync } from 'fs';

class App {
  public app: express.Application;
  public indexPage = readFileSync(join(__dirname, 'index.html'), {
    encoding: 'utf-8'
  });

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/service', serviceRoute);
    router.get('/dependencies', dependencyRoute);
    router.put('/subscription/:subscriberTenantId', subscribeRoute);
    router.delete('/subscription/:subscriberTenantId', unsubscribeRoute);
    router.get('/index.html', (req, res) => {
      res.send(this.indexPage);
    });
    this.app.use('/', router);
  }
}

export default new App().app;
