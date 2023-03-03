import { TmDBMovieList } from '../entities';

export interface GetDiscoverMovies {
  handle(page: number, sort?: any): Promise<TmDBMovieList>;
}
