import {
  Pagination,
  PaginationPreResponse,
  PaginationSortInput,
  PaginationRepositoryResponse,
} from '../../domain/entities';

export type PaginationInputModel<T> = {
  page: number;
  itemsPerPage: number;
  sort?: PaginationSortInput<T>;
};

export type PaginationModel<T> = Pagination<T>;

export type PaginationPreResponseModel<T> = PaginationPreResponse<T>;

export type PaginationRepositoryResponseModel<T> =
  PaginationRepositoryResponse<T>;
