import { Schema } from 'mongoose';

// Models.
import { IListingModel } from '../models/listing';

export const listingSchema: Schema = new Schema({
  airbnbId: {
    required: true,
    type: Number,
    unique: true,
  },
  amenities: [{
    airbnbId: Number,
    name: String,
    tag: String,
  }],
  createdAt: Date,
  coords: {
    lat: Schema.Types.Decimal128,
    lon: Schema.Types.Decimal128,
  },
  description: String,
  host: {
    about: String,
    airbnbId: String,
    name: String,
    url: String,
    verified: Boolean,
  },
  minNights: Number,
  photos: [{
    airbnbId: Number,
    caption: String,
    url: String,
  }],
  rating: Schema.Types.Decimal128,
  title: String,
  updatedAt: Date,
  version: Number,
});

listingSchema.pre<IListingModel>('save', function (next: () => void) {
  const date: Date = new Date();

  if (!this.createdAt) {
    this.createdAt = date;
  }

  this.updatedAt = date;

  next();
});
