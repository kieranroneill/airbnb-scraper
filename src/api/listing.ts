import { Request, Response, Router } from 'express';

// APIs.
import BaseAPI from './base';

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

    router.post('/listing', listing.postListing.bind(listing));
  }

  private async postListing(req: Request, res: Response): Promise<void> {
    const listing: IListing = await scrapeListing(req.body.url);
    const listingModel: IListingModel = new this.model.listing(listing);

    await listingModel.save();

    res.status(201)
      .send(listing)
      .end();
  }
}
