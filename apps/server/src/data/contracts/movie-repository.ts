import { MovieModel, TmDBMovieListModel } from '../models';

export interface IMovieRepository {
  getDiscoverMovies(
    page: number,
    sort?: any,
  ): Promise<TmDBMovieListModel | null>;
  getMovieById(
    movieId: number,
    withCredits?: boolean,
  ): Promise<MovieModel | null>;
  searchMovie(query: string, page: number): Promise<TmDBMovieListModel | null>;
  getTrendingMoviesWeek(page: number): Promise<TmDBMovieListModel | null>;
  getMovieRecommendations(
    movieId: number,
    page: number,
  ): Promise<TmDBMovieListModel | null>;
}
