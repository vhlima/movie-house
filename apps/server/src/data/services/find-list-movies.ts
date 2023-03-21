import { PaginationInput, Movie, Pagination } from '../../domain/entities';

import { NotFoundError, PageNotFoundError } from '../../domain/errors';

import { FindListMovies, FindMoviesReference } from '../../domain/usecases';

import { IListRepository } from '../contracts';
import { MovieReferenceSortType } from '../enums';

const MOVIES_PER_PAGE = 16;

export class FindListMoviesService implements FindListMovies {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly findMoviesReference: FindMoviesReference,
  ) {}

  async handle(
    listId: string,
    { page, sort }: PaginationInput<MovieReferenceSortType>,
  ): Promise<Pagination<Movie>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const listExists = await this.listRepository.getListById(listId);

    if (!listExists) {
      throw new NotFoundError('ListNotFoundError', 'List not found.');
    }

    const movies = this.findMoviesReference.handle(
      listId,
      {
        page,
        sort,
      },
      MOVIES_PER_PAGE,
    );

    return movies;
  }
}
