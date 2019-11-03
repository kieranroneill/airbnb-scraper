import { Browser, launch, Page, Request, ResourceType } from 'puppeteer';

// Interfaces.
import { IListing } from '../../interfaces/listing';

// Utils.
import getListingId from './getListingId';
import getTitle from './getTitle';

/**
 * Handles the request event when loading the page. This optimises the page load to only load the necessary asssets.
 * @param {Request} request a request that is load.
 */
function onRequest(request: Request): Promise<void> {
  const resourceType: ResourceType = request.resourceType();

  if (resourceType === 'font' || resourceType === 'image') {
    return request.abort();
  }

  return request.continue();
}

export default async function(url: string): Promise<IListing> {
  const browser: Browser = await launch({
    headless: true,
  });
  const page: Page = await browser.newPage();
  let listing: IListing;

  await page.setRequestInterception(true);

  page.on('request', onRequest);

  await page.goto(url);

  listing = {
    listingId: getListingId(url),
    title: await getTitle(page),
  };

  await browser.close();

  return listing;
}
