import { MovieModel } from '../models';

export interface IMovieRepository {
  getMovies(page: number, sort?: any): Promise<MovieModel[]>;
  getMovieById(
    movieId: number,
    withCredits?: boolean,
  ): Promise<MovieModel | null>;
  searchMovie(query: string, page: number): Promise<MovieModel[]>;
  getTrendingMoviesWeek(page: number): Promise<MovieModel[]>;
  getMovieRecommendations(movieId: number): Promise<MovieModel[]>;
}
