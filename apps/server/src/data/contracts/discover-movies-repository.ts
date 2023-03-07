import { TmDBMovieSortType } from '../enums';

import { PaginationInputModel, TmDBMovieListModel } from '../models';

export interface IDiscoverMoviesRepository {
  getMoviesFromDiscover(
    props: PaginationInputModel<TmDBMovieSortType>,
  ): Promise<TmDBMovieListModel | null>;
}
