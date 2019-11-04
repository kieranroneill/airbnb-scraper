import axios, { AxiosResponse } from 'axios';
import { Browser, launch, Page, Request, ResourceType } from 'puppeteer';
import { Logger } from 'winston';

// Errors.
import { RequestError } from '../../middlewares/errorHandler';

// Interfaces.
import { IListing } from '../../interfaces/listing';
import { IAirbnbApi } from './types';

// Modules.
import { createLogger } from '../logger';

// Utils.
import getListingId from './getListingId';
import mapListingFromAirbnb from './mapListingFromAirbnb';

const logger: Logger = createLogger();

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
    throw new RequestError(400, 'No listing id found in URL');
  }

  airbnbApi = {
    pathname: `/api/v2/pdp_listing_details/${listingId}`,
  };
  browser = await launch({
    args: ['--no-sandbox'],
    headless: true,
  });
  page = await browser.newPage();

  logger.info('Launching puppeteer...');

  await page.setRequestInterception(true);

  page.on('request', handleRequest.bind(airbnbApi));

  logger.info(`Navigating to: ${url}`);

  await page.goto(url, {
    waitUntil: 'networkidle0', // Wait until network connections have finished with 500ms interval.
  });
  await browser.close();

  logger.info('Closing puppeteer...');

  if (!airbnbApi.key) {
    throw new RequestError(404, 'Could not get Listing from API');
  }

  logger.info('Found Airbnb API key, attempting to call API...');

  // Get he listing from the Airbnb API.
  response = await axios.get(
    `${airbnbApi.protocol}//${airbnbApi.host}${airbnbApi.pathname}?_format=for_rooms_show&key=${airbnbApi.key}`
  );

  return mapListingFromAirbnb(response.data.pdp_listing_detail);
}
