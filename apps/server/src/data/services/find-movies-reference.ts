import {
  PaginationInput,
  MovieReferenceSortType,
  Pagination,
  Movie,
} from '../../domain/entities';

import { PageNotFoundError } from '../../domain/errors';

import { FindMoviesReference } from '../../domain/usecases';

import { IFindMoviesReferenceRepository } from '../contracts';
import { GetPaginationService } from './get-pagination';

const MOVIES_PER_PAGE = 20;

export class FindMoviesReferenceService implements FindMoviesReference {
  constructor(
    private readonly movieReferenceRepository: IFindMoviesReferenceRepository,
  ) {}

  async handle(
    listId: string,
    { page, sort }: PaginationInput<MovieReferenceSortType>,
    itemsPerPage = MOVIES_PER_PAGE,
  ): Promise<Pagination<Movie>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const moviesResponse =
      await this.movieReferenceRepository.getMoviesReferenceById(listId, {
        page,
        sort,
        itemsPerPage,
      });

    const moviesFormatted = moviesResponse.items.map(response => ({
      ...response.movie,
      backdropUrl: response.movie.backdropPath
        ? `https://image.tmdb.org/t/p/w500${response.movie.backdropPath}`
        : '',
      posterUrl: response.movie.posterPath
        ? `https://image.tmdb.org/t/p/original${response.movie.posterPath}`
        : '',
    }));

    const paginationService = new GetPaginationService<Movie>();

    const paginated = paginationService.handle(
      moviesFormatted,
      page,
      itemsPerPage,
      moviesResponse.totalCount,
    );

    return paginated;
  }
}
