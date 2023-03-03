/* T here means the enum sort type from entity */
type PaginationSortInput<T> = {
  type: T;
  filter?: string;
};

export type NewPaginationInput<T> = {
  page: number;
  sort?: PaginationSortInput<T>;
};

export type NewPaginationInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type NewPaginationEdge<T> = {
  node: T;
};

export type NewPagination<T> = {
  totalPages: number;
  totalCount: number;
  pageInfo: NewPaginationInfo;
  edges: NewPaginationEdge<T>[];
};

export type PaginationResponse<T> = {
  items: T[];
  totalCount: number;
};
