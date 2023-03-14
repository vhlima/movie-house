import { SortOptionsModel, TmDBMovieListModel } from '../models';

export interface IDiscoverMoviesRepository {
  getMoviesFromDiscover(
    page: number,
    sort: SortOptionsModel,
  ): Promise<TmDBMovieListModel | null>;
}
