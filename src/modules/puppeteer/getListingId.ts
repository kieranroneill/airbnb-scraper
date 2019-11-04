/**
 * Extracts the listing id from an Airbnb listing url.
 * @param {string} url the Airbnb listing url.
 * @returns {number} returns the listing id as a number, or undefined if it is not a listing url.
 */
export default function(url: string): number | undefined {
  const urlArray: string[] = url.split('/');
  const index: number = urlArray.indexOf('rooms');

  if (index < 0 || index >= (urlArray.length - 1)) {
    return undefined;
  }

  return parseInt(urlArray[index + 1]);
}
