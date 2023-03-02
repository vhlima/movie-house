import { PaginationModel } from '../models';

export interface IPaginationRepository<T> {
  getPaginatedResponse(
    items: T[],
    page: number,
    itemsPerPage: number,
    totalCount: number,
  ): PaginationModel<T>;
}
