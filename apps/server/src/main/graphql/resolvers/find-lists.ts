import { Arg, Int, Query, Resolver } from 'type-graphql';

import { getFindListsService } from '../../factories';

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

    return listsResponse;
  }
}
