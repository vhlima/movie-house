import {
  PaginationInput,
  PaginationPreResponse,
  List,
} from '../../domain/entities';

import { PageNotFoundError } from '../../domain/errors';

import { FindLists } from '../../domain/usecases';

import { IFindListsRepository } from '../contracts';

import { ListSortTypeModel } from '../models';

const LISTS_PER_PAGE = 5;

export class FindListsService implements FindLists {
  constructor(private readonly findListsRepository: IFindListsRepository) {}

  async handle(
    { page, sort }: PaginationInput<ListSortTypeModel>,
    userId?: string | undefined,
  ): Promise<PaginationPreResponse<List>> {
    if (page < 1) {
      throw new PageNotFoundError();
    }

    const reviewsResponse = await this.findListsRepository.getLists(
      {
        page,
        sort,
        itemsPerPage: LISTS_PER_PAGE,
      },
      userId,
    );

    return reviewsResponse;
  }
}
