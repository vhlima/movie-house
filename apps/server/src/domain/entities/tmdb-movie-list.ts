import { Pagination } from './pagination';

type TmDBMovie = {
  id: number;
  adult: boolean;
  backdropPath?: string;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath?: string;
  releaseDate?: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
};

export type TmDBMovieList = Pagination<TmDBMovie>;
