import { PreMadeListType, User } from '../entities';

export interface RemoveMovieFromPreMadeList {
  handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | null,
  ): Promise<boolean>;
}
