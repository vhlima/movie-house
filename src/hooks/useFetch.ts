import useSWR, { SWRResponse } from 'swr';

export type FetchResponse<T> = SWRResponse<T>;

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const useFetch = <T>(url: string): FetchResponse<T> => {
  const swrResponse = useSWR<T>(url, fetcher);

  return swrResponse;
};

export default { useFetch };
