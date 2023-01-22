export function cookieParser(cookieString: string): Record<string, string> {
  if (cookieString === '') return {};

  const pairs = cookieString.split(';');

  const splittedPairs = pairs.map(cookie => cookie.split('='));

  const cookieObj = splittedPairs.reduce(
    (obj, cookie) => ({
      ...obj,
      [decodeURIComponent(cookie[0].trim())]: decodeURIComponent(
        cookie[1].trim(),
      ),
    }),
    {},
  );

  return cookieObj;
}
