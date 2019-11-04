import { NextFunction, Request, Response, Router } from 'express';
import { Query } from 'mongoose';

// APIs.
import BaseAPI from './base';

// Constants.
import * as ApiConstants from './constants';

// Errors.
import { RequestError } from '../middlewares/errorHandler';

// Interfaces.
import { IListing } from '../interfaces/listing'

// Models.
import { IModel } from '../models';
import { IListingModel } from '../models/listing';

// Modules.
import { scrapeListing } from '../modules/puppeteer';

export default class ListingAPI extends BaseAPI {
  /**
   * Create the endpoints.
   * @param {Router} router an Express router.
   * @param {IModel} model the MongoDB models.
   */
  public static create(router: Router, model: IModel): void {
    const listing: ListingAPI = new ListingAPI(model);

    router.post(ApiConstants.LISTING_ENDPOINT, listing.postListing.bind(listing));
  }

  private async postListing(req: Request, res: Response, next: NextFunction): Promise<void> {
    const url: string | undefined = req.body.url;
    let listing: IListing;
    let docQuery: Query<IListingModel>;
    let responseCode: number = 200;

    try {
      // If we have no URL or it is not an Airbnb listing.
      if (!url || !url.includes('airbnb.co.uk/rooms/')) {
        throw new RequestError(400, 'This is not an Airbnb URL');
      }

      listing = await scrapeListing(req.body.url);
      docQuery = await this.model.listing.updateOne({
        airbnbId: listing.airbnbId,
      }, listing, {
        upsert: true,
      });

      // If we have created a new document, send a 201!
      if (docQuery['nModified'] <= 0) {
        responseCode = 201;
      }

      return res.status(responseCode)
        .send(listing)
        .end();
    } catch (error) {
      if (error instanceof RequestError) {
        return next(error);
      }

      // Wrap all other errors as a 500 RequestError.
      return next(new RequestError(500, error.message));
    }
  }
}
