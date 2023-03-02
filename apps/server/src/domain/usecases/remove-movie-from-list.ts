import { User } from '../entities';

export interface RemoveMovieFromList {
  handle(
    listId: string,
    movieId: number,
    session?: User | null,
  ): Promise<boolean>;
}
