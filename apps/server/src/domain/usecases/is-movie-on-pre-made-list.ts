import { User } from '../entities';
import { PreMadeListType } from '../enums';

export interface IsMovieOnPreMadeList {
  handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | null,
  ): Promise<boolean>;
}
