import { TmDBMovieList } from '../../domain/entities';
import { GetTrendingMoviesWeek } from '../../domain/usecases';
import { IMovieRepository } from '../contracts';

import { GetTmDBMoviePaginationService } from './get-tmdb-movie-pagination';

export class GetTrendingMoviesWeekService implements GetTrendingMoviesWeek {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async handle(page: number): Promise<TmDBMovieList> {
    const trendingMoviesResponse =
      await this.movieRepository.getTrendingMoviesWeek(page);

    const getTmDBMoviePaginationService = new GetTmDBMoviePaginationService();

    const response = getTmDBMoviePaginationService.handle(
      trendingMoviesResponse,
    );

    return response;
  }
}
