// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { MovieData } from '../../../types';

import * as fakeData from '../../../data/fake.json';

import { simulateRequest } from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieData[]>,
) {
  const movies = fakeData.movies as MovieData[];

  const fakeMoviesResponse = await simulateRequest<MovieData[]>(movies);

  return res.status(200).json(fakeMoviesResponse);
}
