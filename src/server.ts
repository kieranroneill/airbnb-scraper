import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import * as Express from 'express';
import * as Helmet from 'helmet';
import { Connection, createConnection } from 'mongoose';
import * as logger from 'morgan';

// APIs.
import { ListingAPI } from './api';

// Constants.
import * as ApiConstants from './api/constants';

// Middlewares.
import errorHandler from './middlewares/errorHandler';

// Models
import { IModel } from './models';
import { IListingModel } from './models/listing';

// Schemas
import { listingSchema } from './schemas/listing';

export class Server {
  public app: Express.Application;

  private model!: IModel;

  constructor() {
    this.app = Express();

    this.config();
    this.api();
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
    connection = createConnection(mongoDbUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create models.
    this.model = {
      listing: connection.model<IListingModel>('Listing', listingSchema),
    };

    // Error handling.
    this.app.use(errorHandler);
  }
}
