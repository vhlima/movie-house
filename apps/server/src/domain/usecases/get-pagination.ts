import { Pagination } from '../entities';

export interface GetPagination<T> {
  handle: (
    items: T[],
    page: number,
    itemsPerPage: number,
    totalCount: number,
  ) => Pagination<T>;
}
