import { Document } from 'mongoose';

// Interfaces.
import { IListing } from '../interfaces/listing';

export interface IListingModel extends IListing, Document {
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
