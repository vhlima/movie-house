import { IPaginationRepository } from '../../data/contracts';

import { Pagination } from '../../domain/entities';

export class PaginationRepository<T> implements IPaginationRepository<T> {
  getPaginatedResponse(
    items: T[],
    page: number,
    itemsPerPage: number,
    totalCount: number,
  ): Pagination<T> {
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      totalPages,
      totalCount,
      edges: items.map(item => ({ node: item })),
      pageInfo: {
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
