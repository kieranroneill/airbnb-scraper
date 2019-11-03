import { Request, Response, Router } from 'express';

// APIs.
import BaseAPI from './base';

// Constants.
import * as ApiConstants from './constants';

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

  private async postListing(req: Request, res: Response): Promise<void> {
    const url: string | undefined = req.body.url;
    let listing: IListing;

    // If we have no URL or it is not an Airbnb listing.
    if (!url || !url.includes('airbnb.co.uk/rooms/')) {
      return res.status(400)
        .send('This is not an Airbnb listing')
        .end();
    }

    listing = await scrapeListing(req.body.url);

    await new this.model.listing(listing).save();

    res.status(201)
      .send(listing)
      .end();
  }
}
