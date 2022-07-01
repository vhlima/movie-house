// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { MovieData } from '../../../types';

import { simulateRequest } from '../../../utils';

import * as fakeData from '../../../data/fake.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieData>,
) {
  const { id } = req.query;

  if (!id) return res.status(404);

  const fakeMovie = fakeData.movies.find(m => m.id === id);

  if (!fakeMovie) {
    res.statusMessage = 'Movie not found';

    return res.status(404);
  }

  const fakeMovieResponse = await simulateRequest(fakeMovie as MovieData);

  return res.status(200).json(fakeMovieResponse);
}
