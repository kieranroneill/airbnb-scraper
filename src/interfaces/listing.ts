export interface IAmenity  {
  airbnbId: number;
  name: string;
  tag: string;
}

export interface IHost {
  about?: string;
  airbnbId: number;
  name: string;
  url: string;
  verified: boolean;
}

export interface ICoords {
  lat: number;
  lon: number;
}

export interface IListing {
  airbnbId: number;
  amenities: IAmenity[];
  coords: ICoords;
  description: string;
  host: IHost;
  minNights: number;
  photos: IPhoto[];
  rating: number;
  rooms: IRoom[];
  title: string;
}

export interface IPhoto {
  airbnbId: number;
  caption: string;
  url: string;
}

export interface IRoom {
  beds: number;
}
