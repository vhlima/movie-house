import { MovieReference } from '../entities';

export interface CreateMovieReference {
  handle: (referenceId: string, movieId: number) => Promise<MovieReference>;
}
