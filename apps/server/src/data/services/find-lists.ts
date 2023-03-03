import {
  ListPreview,
  Pagination,
  PaginationInput,
} from '../../domain/entities';

import { PageNotFoundError } from '../../domain/errors';

import { FindLists } from '../../domain/usecases';

import { IFindListsRepository } from '../contracts';

import { ListSortTypeModel } from '../models';
import { FindMoviesReferenceService } from './find-movies-reference';
import { GetPaginationService } from './get-pagination';

const LISTS_PER_PAGE = 5;

export class FindListsService implements FindLists {
  constructor(
    private readonly findListsRepository: IFindListsRepository,
    private readonly findMoviesReferenceService: FindMoviesReferenceService,
  ) {}

  async handle(
    { page, sort }: PaginationInput<ListSortTypeModel>,
    userId?: string | undefined,
  ): Promise<Pagination<ListPreview>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const listsResponse = await this.findListsRepository.getLists(
      {
        page,
        sort,
        itemsPerPage: LISTS_PER_PAGE,
      },
      userId,
    );

    const listsMoviesPromise = listsResponse.items.map(list =>
      this.findMoviesReferenceService.handle(
        list.id,
        { page: 1 },
        LISTS_PER_PAGE,
      ),
    );

    const listMoviesResponse = await Promise.all(listsMoviesPromise);

    const listsWithMovies = listsResponse.items.map((list, index) => ({
      ...list,
      movies: listMoviesResponse[index].items.map(node => node.movie),
    }));

    const paginationService = new GetPaginationService<ListPreview>();

    const listWithMoviesPaginated = paginationService.handle(
      listsWithMovies,
      1,
      LISTS_PER_PAGE,
      listsResponse.totalCount,
    );

    return listWithMoviesPaginated;
  }
}
