import { MovieReference } from '../entities';

export interface FindMovieReference {
  handle: (referenceId: string) => Promise<MovieReference | null>;
}
