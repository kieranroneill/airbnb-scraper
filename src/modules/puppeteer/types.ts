export interface IAirbnbApi {
  host?: string;
  key?: string | null;
  pathname?: string;
  protocol?: string;
}

export interface IAirbnbListing {
  additional_house_rules: string;
  bathroom_label: string;
  bed_label: string;
  country_code: string;
  guest_label: string;
  id: number;
  lat: number;
  listing_amenities: IAirbnbListingAmenity[];
  listing_rooms: IAirbnbListingRoom[];
  lng: number;
  min_nights: number;
  name: string;
  neighborhood_id: number;
  person_capacity: number;
  photos: IAirbnbListingPhoto[];
  primary_host: IAirbnbListingHost;
  sectioned_description: IAirbnbListingSectionedDescription;
  star_rating: number;
}

export interface IAirbnbListingAmenity {
  id: number;
  is_business_ready_feature: boolean;
  is_present: boolean;
  is_safety_feature: boolean;
  name: string;
  tag: string;
}

export interface IAirbnbListingBed {
  id: string;
  quantity: number;
  types: string;
}

export interface IAirbnbListingHost {
  about: string;
  host_name: string;
  id: number;
  identity_verified: boolean;
  is_superhost: boolean;
  profile_path: string;
  profile_pic_path: string;
}

export interface IAirbnbListingPhoto {
  aspect_ratio: number;
  caption: string;
  id: number;
  is_professional: boolean;
  large: string;
  large_cover: string;
  medium: string;
  picture: string;
  small: string;
  sort_order: number;
  thumbnail: string;
  x_large: string;
  x_large_cover: string;
  picture_orientation: 'LANDSCAPE' | 'PORTRAIT';
}

export interface IAirbnbListingRoom {
  beds: IAirbnbListingBed[];
  id: number;
  room_number: number;
}

export interface IAirbnbListingSectionedDescription {
  access: string;
  author_type: string;
  description: string;
  house_rules: string;
  interaction: string;
  name: string;
  notes: string;
  space: string;
  summary: string;
  transit: string;
}
