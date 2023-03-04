export type PaginationSortInput<T> = {
  type: T;
  filter?: string;
};

export type PaginationInput<T = any> = {
  page: number;
  sort?: PaginationSortInput<T>;
};

export type PaginationInfo = {
  currentPage: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginationEdge<T> = {
  node: T;
};

export type Pagination<T> = {
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  pageInfo: PaginationInfo;
  edges: PaginationEdge<T>[];
};

export type PaginationPreResponse<T> = {
  items: T[];
  page: number;
  itemsPerPage: number;
  totalCount: number;
};

export type PaginationRepositoryResponse<T> = {
  items: T[];
  totalCount: number;
};
