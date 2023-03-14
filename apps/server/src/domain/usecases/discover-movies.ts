import { PaginationInput, TmDBMovieList } from '../entities';

import { TmDBMovieSortType } from '../enums';

export interface DiscoverMovies {
  handle(props: PaginationInput<TmDBMovieSortType>): Promise<TmDBMovieList>;
}
