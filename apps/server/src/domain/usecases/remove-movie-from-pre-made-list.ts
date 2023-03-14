import { User } from '../entities';
import { PreMadeListType } from '../enums';

export interface RemoveMovieFromPreMadeList {
  handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | null,
  ): Promise<boolean>;
}
