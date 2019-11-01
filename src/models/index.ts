import { Model } from 'mongoose';

// Interfaces.
import { IListingModel } from './listing';

export interface IModel {
  listing: Model<IListingModel>;
}
