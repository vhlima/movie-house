import { Movie } from '../entities';

export interface CreateMovie {
  handle: (referenceId: string, movie: Movie) => Promise<void>;
}
