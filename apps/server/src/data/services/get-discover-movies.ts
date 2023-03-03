import { TmDBMovieList } from '../../domain/entities';
import { GetDiscoverMovies } from '../../domain/usecases';
import { IMovieRepository } from '../contracts';

import { GetTmDBMoviePaginationService } from './get-tmdb-movie-pagination';

export class GetDiscoverMoviesService implements GetDiscoverMovies {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async handle(page: number, sort?: any): Promise<TmDBMovieList> {
    const discoverMoviesResponse = await this.movieRepository.getDiscoverMovies(
      page,
      sort,
    );

    const getTmDBMoviePaginationService = new GetTmDBMoviePaginationService();

    const response = getTmDBMoviePaginationService.handle(
      discoverMoviesResponse,
    );

    return response;
  }
}
