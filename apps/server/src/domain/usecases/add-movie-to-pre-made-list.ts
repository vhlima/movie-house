import { MovieReference, PreMadeListType, User } from '../entities';

export interface AddMovieToPreMadeList {
  handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User,
  ): Promise<MovieReference>;
}
