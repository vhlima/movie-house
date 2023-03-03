import {
  PaginationInput,
  PaginationPreResponse,
  MovieReferenceSortType,
  MovieReference,
} from '../../domain/entities';

import { NotFoundError, PageNotFoundError } from '../../domain/errors';

import { FindListMovies } from '../../domain/usecases';

import { IFindMoviesReferenceRepository, IListRepository } from '../contracts';

const MOVIES_PER_PAGE = 20;

export class FindListMoviesService implements FindListMovies {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly movieReferenceRepository: IFindMoviesReferenceRepository,
  ) {}

  async handle(
    listId: string,
    { page, sort }: PaginationInput<MovieReferenceSortType>,
  ): Promise<PaginationPreResponse<MovieReference>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const listExists = await this.listRepository.getListById(listId);

    if (!listExists) {
      throw new NotFoundError('ListNotFoundError', 'List not found.');
    }

    const moviesResponse =
      await this.movieReferenceRepository.getMoviesReferenceById(listId, {
        page,
        sort,
        itemsPerPage: MOVIES_PER_PAGE,
      });

    return moviesResponse;
  }
}
