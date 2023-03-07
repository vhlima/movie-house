import { MovieGenre } from '../../domain/entities';
import { MovieModel, TmDBMovieListModel } from '../models';

export interface IMovieRepository {
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
  getMovieGenres(): Promise<MovieGenre[]>;
}
