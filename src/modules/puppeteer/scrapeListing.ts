import axios, { AxiosResponse } from 'axios';
import { Browser, launch, Page, Request, ResourceType, Response } from 'puppeteer';

// Interfaces.
import { IListing } from '../../interfaces/listing';
import { IAirbnbApi } from './types';

// Utils.
import getListingId from './getListingId';
import mapListingFromAirbnb from './mapListingFromAirbnb';

/**
 * Handles the request event when loading the page. This optimises the page load to only load the necessary asssets.
 * @param {Request} request a request that is load.
 */
function handleRequest(this: IAirbnbApi, request: Request): Promise<void> {
  const resourceType: ResourceType = request.resourceType();
  let parsedAirbnbUrl: URL;

  if (resourceType === 'font' || resourceType === 'image') {
    return request.abort();
  }

  if (request.resourceType() === 'fetch' && request.url().includes('/api/v2/pdp_listing_booking_details')) {
    parsedAirbnbUrl = new URL(request.url());
    this.host = parsedAirbnbUrl.host;
    this.key = parsedAirbnbUrl.searchParams.get('key');
    this.protocol = parsedAirbnbUrl.protocol;
  }

  return request.continue();
}

export default async function(url: string): Promise<IListing> {
  const listingId: number | undefined = getListingId(url);
  let airbnbApi: IAirbnbApi;
  let browser: Browser;
  let page: Page;
  let response: AxiosResponse;

  if (!listingId) {
    throw new Error('no listing found');
  }

  airbnbApi = {
    pathname: `/api/v2/pdp_listing_details/${listingId}`,
  };
  browser = await launch({
    headless: true,
  });
  page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', handleRequest.bind(airbnbApi));

  await page.goto(url, {
    waitUntil: 'networkidle0', // Wait until network connections have finished with 500ms.
  });
  await browser.close();

  // Get he listing from the Airbnb API.
  response = await axios.get(
    `${airbnbApi.protocol}//${airbnbApi.host}${airbnbApi.pathname}?_format=for_rooms_show&key=${airbnbApi.key}`
  );

  return mapListingFromAirbnb(response.data.pdp_listing_detail);
}
