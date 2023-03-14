/* eslint-disable camelcase */

import { TmDBMovieModel } from './tmdb-movie';

export type TmDBMovieListModel = {
  page: number;
  total_pages: number;
  total_results: number;

  results: TmDBMovieModel[];
};
