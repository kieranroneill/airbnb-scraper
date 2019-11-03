// Modules.
import getListingId from './getListingId';

describe('src/modules/puppeteer/getListingId', () => {
  it('should return undefined if the url is not a listing', () => {
    expect(getListingId('https://some.random.url')).toBeUndefined();
  });

  it('should return undefined if the does not have a listing id', () => {
    expect(getListingId('https://airbnb.co.uk/rooms')).toBeUndefined();
  });

  it('should return the listing id', () => {
    const listingId: number = 28299515;

    expect(getListingId(`https://airbnb.co.uk/rooms/${listingId}`)).toBe(listingId);
  });
});
