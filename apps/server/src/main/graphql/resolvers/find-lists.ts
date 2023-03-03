import { Arg, Int, Query, Resolver } from 'type-graphql';

import {
  getFindListsPaginatedService,
  getFindListsService,
} from '../../factories';

import { ListSortInput } from '../inputs';

import { ListPagination } from '../objects';

@Resolver(() => ListPagination)
export class FindListsResolver {
  @Query(() => ListPagination)
  async lists(
    @Arg('page', () => Int) page: number,
    @Arg('userId', { nullable: true }) userId?: string,
    @Arg('sort', () => ListSortInput, { nullable: true })
    sort?: ListSortInput,
  ) {
    const findListsService = getFindListsService();

    const listsResponse = await findListsService.handle(
      {
        page,
        sort,
      },
      userId,
    );

    const findListsPaginationService = getFindListsPaginatedService();

    const response = findListsPaginationService.handle(
      listsResponse.items,
      page,
      listsResponse.itemsPerPage,
      listsResponse.totalCount,
    );

    return response;
  }
}
