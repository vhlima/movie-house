import { PreMadeListType } from '../enums';

export interface GetPreMadeListMovieCount {
  handle(
    userId: string,
    listType: PreMadeListType,
    start?: Date,
    end?: Date,
  ): Promise<number>;
}
