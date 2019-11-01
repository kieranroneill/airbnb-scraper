export interface IAmenity  {
  name: string;
}

export interface IHost {
  name: string;
  url: string;
}

export interface IListing {
  amenities?: IAmenity[];
  description?: string;
  host: IHost;
  photos?: IPhoto[];
  rating?: string;
  title?: string;
}

export interface IPhoto {
  url: string;
}
