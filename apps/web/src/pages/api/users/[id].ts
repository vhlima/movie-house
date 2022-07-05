// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { UserData } from '../../../types';

import { simulateRequest } from '../../../utils';

import * as fakeData from '../../../data/fake.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData>,
) {
  const fakeUser = fakeData.users[0] as UserData;

  const fakeUserResponse = await simulateRequest<UserData>(fakeUser);

  return res.status(200).json(fakeUserResponse);
}
