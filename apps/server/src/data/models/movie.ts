/* eslint-disable camelcase */

import {
  CompanyModel,
  MovieGenreModel,
  LanguageModel,
  MovieCreditsModel,
} from './index';

export type MovieModel = {
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  runtime: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  genres: MovieGenreModel[];
  production_companies: CompanyModel[];
  spoken_languages: LanguageModel[];
  credits?: MovieCreditsModel;
};
