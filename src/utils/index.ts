const BASE_URL_DEV = 'http://localhost:3000';

export async function fetcher<T>(url: string) {
  const res = await fetch(`${BASE_URL_DEV}${url}`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data as T;
}

/* eslint-disable no-promise-executor-return */

export async function simulateRequest<T>(result: T) {
  const requestResult: T = await new Promise(resolve =>
    setTimeout(() => resolve(result), 1000),
  );

  return requestResult;
}

export function loop<T>(times: number, callback: (list: T[]) => T) {
  const list: T[] = [];

  for (let i = 0; i < times; i += 1) {
    list.push(callback(list));
  }

  return list;
}
