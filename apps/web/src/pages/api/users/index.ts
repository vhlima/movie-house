// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { UserData } from '../../../types';

import * as fakeData from '../../../data/fake.json';

import { simulateRequest } from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[]>,
) {
  const users = fakeData.users as UserData[];

  const fakeUsersResponse = await simulateRequest<UserData[]>(users);

  return res.status(200).json(fakeUsersResponse);
}
