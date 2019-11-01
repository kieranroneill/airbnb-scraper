import { Schema } from 'mongoose';

// Models.
import { IListingModel } from '../models/listing';

export const listingSchema: Schema = new Schema({
  createdAt: Date,
  description: String,
  host: {
    name: String,
    url: String,
  },
  rating: String,
  title: String,
  updatedAt: Date,
});

listingSchema.pre<IListingModel>('save', function (next: () => void) {
  const date: Date = new Date();

  if (!this.createdAt) {
    this.createdAt = date;
  }

  this.updatedAt = date;

  next();
});
