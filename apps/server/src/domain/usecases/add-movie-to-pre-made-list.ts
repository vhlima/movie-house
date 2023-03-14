import { MovieReference, User } from '../entities';
import { PreMadeListType } from '../enums';

export interface AddMovieToPreMadeList {
  handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User,
  ): Promise<MovieReference>;
}
