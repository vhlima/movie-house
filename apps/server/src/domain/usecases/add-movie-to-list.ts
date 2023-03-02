import { MovieReference, User } from '../entities';

export interface AddMovieToList {
  handle(
    listId: string,
    movieId: number,
    session?: User,
  ): Promise<MovieReference>;
}
