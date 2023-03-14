import { TmDBMovieList } from '../entities';

export interface GetTrendingMoviesWeek {
  handle(page: number): Promise<TmDBMovieList>;
}
