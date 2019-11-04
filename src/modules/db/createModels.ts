import { Connection } from 'mongoose';

// Models.
import { IModel } from '../../models';
import { IListingModel } from '../../models/listing';

// Schemas
import { listingSchema } from '../../schemas/listing';

/**
 * Convenience function to create the db model.
 * @param {Connection} connection a mongoose connection.
 * @returns {IModel} an initialised model.
 */
export default function (connection: Connection): IModel {
  return {
    listing: connection.model<IListingModel>('Listing', listingSchema),
  };
}

