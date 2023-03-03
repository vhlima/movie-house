import { TmDBMovieList } from '../../domain/entities';
import { SearchMovie } from '../../domain/usecases';
import { IMovieRepository } from '../contracts';
import { GetTmDBMoviePaginationService } from './get-tmdb-movie-pagination';

export class SearchMovieService implements SearchMovie {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async handle(searchTerm: string, page: number): Promise<TmDBMovieList> {
    const movieSearchResult = await this.movieRepository.searchMovie(
      searchTerm,
      page,
    );

    const getTmDBMoviePaginationService = new GetTmDBMoviePaginationService();

    const response = getTmDBMoviePaginationService.handle(movieSearchResult);

    return response;
  }
}
