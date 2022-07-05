import { UserData } from '../types';

import { FetchResponse, useFetch } from './useFetch';

const useUser = (userId: string): FetchResponse<UserData> => {
  const fetchResponse = useFetch<UserData>(`/api/user/${userId}`);

  return fetchResponse;
};

export default { useUser };
