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
  ): Promise<PaginationPreResponse<MovieReference>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const moviesResponse =
      await this.movieReferenceRepository.getMoviesReferenceById(listId, {
        page,
        sort,
        itemsPerPage: MOVIES_PER_PAGE,
      });

    return {
      page,
      items: moviesResponse.items,
      totalCount: moviesResponse.totalCount,
      itemsPerPage: MOVIES_PER_PAGE,
    };
  }
}
