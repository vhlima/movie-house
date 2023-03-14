import { Movie } from '../entities';

export interface FindMovie {
  handle: (movieId: number) => Promise<Movie>;
}
