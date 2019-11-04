import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import * as Express from 'express';
import * as Helmet from 'helmet';
import { Connection } from 'mongoose';
import * as logger from 'morgan';
import { Logger } from 'winston';

// APIs.
import { ListingAPI } from './api';

// Constants.
import * as ApiConstants from './api/constants';

// Middlewares.
import errorHandler from './middlewares/errorHandler';

// Models
import { IModel } from './models';

// Modules.
import { connect, createModels } from './modules/db';
import { createLogger } from './modules/logger';

export class Server {
  public app: Express.Application;
  public logger: Logger;

  private model!: IModel;

  constructor() {
    this.app = Express();
    this.logger = createLogger();

    this.config();
    this.api();

    // Error handling.
    this.app.use(errorHandler);
  }

  /**
   * Creates the API endpoints.
   */
  private api(): void {
    const router: Express.Router = Express.Router();

    ListingAPI.create(router, this.model);

    this.app.use(ApiConstants.BASE_ENDPOINT, router);
  }

  /**
   * Configures the application.
   */
  private config(): void {
    const mongoDbUri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/airbnb-listings';
    let connection: Connection;

    // Source env file.
    config();

    // Setup some middlewares.
    this.app.use(logger('dev'));
    this.app.use(Helmet());
    this.app.use(json());
    this.app.use(urlencoded({
      extended: true,
    }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));

    // Connect to DB.
    connection = connect(mongoDbUri);

    connection.on('connected', () => this.logger.info(`Connected to: ${mongoDbUri}`));

    // Create models.
    this.model = createModels(connection);
  }
}
