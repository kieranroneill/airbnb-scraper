// Interfaces.
import { IListing } from '../../interfaces/listing';
import { IAirbnbListing } from './types';

/**
 * Convenience function that simply maps the Airbnb api response to a MongoDB interface.
 * @param {IAirbnbListing} airbnbListing the listing returned from the Airbnb API.
 * @returns {IListing} an object ready to be saved to MongoDB.
 */
export default function(airbnbListing: IAirbnbListing): IListing {
  return {
    amenities: airbnbListing.listing_amenities.map(({ id, name, tag }) => ({
      airbnbId: id,
      name,
      tag,
    })),
    coords: {
      lat: airbnbListing.lat,
      lon: airbnbListing.lng,
    },
    description: airbnbListing.sectioned_description.description,
    host: {
      about: airbnbListing.primary_host.about,
      airbnbId: airbnbListing.primary_host.id,
      name: airbnbListing.primary_host.host_name,
      url: `https://airbnb.com/${airbnbListing.primary_host.profile_path}`,
      verified: airbnbListing.primary_host.identity_verified,
    },
    airbnbId: airbnbListing.id,
    minNights: airbnbListing.min_nights,
    photos: airbnbListing.photos.map(({ caption, id, picture }) => ({
      airbnbId: id,
      caption,
      url: picture,
    })),
    rating: airbnbListing.star_rating,
    rooms: airbnbListing.listing_rooms.map(({ beds }) => ({
      beds: beds.length,
    })),
    title: airbnbListing.name,
  };
}
