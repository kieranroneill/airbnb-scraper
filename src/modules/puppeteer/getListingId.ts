export default function(url: string): number | undefined {
  const urlArray: string[] = url.split('/');
  const index: number = urlArray.indexOf('rooms');

  if (index < 0 || index >= (urlArray.length - 1)) {
    return undefined;
  }

  return parseInt(urlArray[index + 1]);
}

