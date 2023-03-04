import { Pagination } from '../../domain/entities';

import { GetPagination } from '../../domain/usecases';

import { PageNotFoundError } from '../../domain/errors';

export class GetPaginationService<T> implements GetPagination<T> {
  handle(
    items: T[],
    page: number,
    itemsPerPage: number,
    totalCount: number,
  ): Pagination<T> {
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (page < 1 || page > totalPages) {
      throw new PageNotFoundError();
    }

    return {
      totalPages,
      totalCount,
      itemsPerPage,
      edges: items.map(item => ({ node: item })),
      pageInfo: {
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
