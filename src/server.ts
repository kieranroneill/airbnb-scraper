import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import * as errorHandler from 'errorhandler';
import * as Express from 'express';
import * as Helmet from 'helmet';
import { Connection, createConnection } from 'mongoose';
import * as logger from 'morgan';

// Models
import { IModel } from './models';
import { IListingModel } from './models/listing';

// Schemas
import { listingSchema } from './schemas/listing';

/**
 * The server.
 * @class Server
 */
export class Server {
  public app: Express.Application;

  private model!: IModel;

  /**
   * Constructor.
   * @class Server
   * @constructor
   */
  constructor() {
    this.app = Express();

    this.config();
  }

  /**
   * Configure application
   * @class Server
   * @method config
   */
  public config() {
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
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create models.
    this.model = {
      listing: connection.model<IListingModel>('Listing', listingSchema),
    };

    // Catch 404 and forward to error handler
    this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    // Error handling.
    this.app.use(errorHandler());
  }
}
