import {
  PaginationInput,
  PaginationPreResponse,
  MovieReferenceSortType,
  MovieReference,
} from '../../domain/entities';

import { PageNotFoundError } from '../../domain/errors';

import { FindMoviesReference } from '../../domain/usecases';

import { IFindMoviesReferenceRepository } from '../contracts';

const MOVIES_PER_PAGE = 20;

export class FindMoviesReferenceService implements FindMoviesReference {
  constructor(
    private readonly movieReferenceRepository: IFindMoviesReferenceRepository,
  ) {}

  async handle(
    listId: string,
    { page, sort }: PaginationInput<MovieReferenceSortType>,
    itemsPerPage = MOVIES_PER_PAGE,
  ): Promise<PaginationPreResponse<MovieReference>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const moviesResponse =
      await this.movieReferenceRepository.getMoviesReferenceById(listId, {
        page,
        sort,
        itemsPerPage,
      });

    return {
      page,
      items: moviesResponse.items.map(response => ({
        ...response,
        movie: {
          ...response.movie,
          backdropUrl: response.movie.backdropPath
            ? `https://image.tmdb.org/t/p/w500${response.movie.backdropPath}`
            : '',
          posterUrl: response.movie.posterPath
            ? `https://image.tmdb.org/t/p/original${response.movie.posterPath}`
            : '',
        },
      })),
      totalCount: moviesResponse.totalCount,
      itemsPerPage,
    };
  }
}
