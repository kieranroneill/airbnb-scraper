import { Schema } from 'mongoose';

// Models.
import { IListingModel } from '../models/listing';

export const listingSchema: Schema = new Schema({
  createdAt: {
    required: true,
    type: Date,
  },
  description: String,
  host: {
    name: String,
    url: String,
  },
  listingId: {
    required: true,
    type: Number,
    unique: true,
  },
  rating: String,
  title: String,
  updatedAt: {
    required: true,
    type: Date,
  },
});

listingSchema.pre<IListingModel>('save', function (next: () => void) {
  const date: Date = new Date();

  if (!this.createdAt) {
    this.createdAt = date;
  }

  this.updatedAt = date;

  next();
});
