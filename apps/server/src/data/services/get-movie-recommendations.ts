import { TmDBMovieList } from '../../domain/entities';
import { GetMovieRecommendations } from '../../domain/usecases';
import { IMovieRepository } from '../contracts';

import { GetTmDBMoviePaginationService } from './get-tmdb-movie-pagination';

export class GetMovieRecommendationsService implements GetMovieRecommendations {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async handle(movieId: number, page: number): Promise<TmDBMovieList> {
    const movieRecommendationsResponse =
      await this.movieRepository.getMovieRecommendations(movieId, page);

    const getTmDBMoviePaginationService = new GetTmDBMoviePaginationService();

    const response = getTmDBMoviePaginationService.handle(
      movieRecommendationsResponse,
    );

    return response;
  }
}
