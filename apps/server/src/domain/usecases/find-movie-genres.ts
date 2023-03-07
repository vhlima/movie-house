import { MovieGenre } from '../entities';

export interface FindMovieGenres {
  handle(): Promise<MovieGenre[]>;
}
