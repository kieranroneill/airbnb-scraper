import { Page } from 'puppeteer';

export default async function(page: Page): Promise<string> {
  return await page.title();
}
