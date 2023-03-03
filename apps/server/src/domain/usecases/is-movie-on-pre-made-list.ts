import { PreMadeListType, User } from '../entities';

export interface IsMovieOnPreMadeList {
  handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | null,
  ): Promise<boolean>;
}
