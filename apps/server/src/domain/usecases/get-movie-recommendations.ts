import { TmDBMovieList } from '../entities';

export interface GetMovieRecommendations {
  handle(movieId: number, page: number): Promise<TmDBMovieList>;
}
