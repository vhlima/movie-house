import { PreMadeListType } from '../entities';

export interface GetPreMadeListMovieCount {
  handle(
    userId: string,
    listType: PreMadeListType,
    start?: Date,
    end?: Date,
  ): Promise<number>;
}
