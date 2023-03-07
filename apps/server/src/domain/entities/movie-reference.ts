import { Movie, Timestamps } from './index';

export class MovieReference extends Timestamps {
  id: string;

  referenceId: string;

  movieId: number;

  movie: Movie;
}
