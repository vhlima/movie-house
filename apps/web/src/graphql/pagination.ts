export interface PaginationInput {
  first: number;
  after?: string;
}

export default interface Pagination<T> {
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
  };
  edges: Array<{ cursor: string; node: T }>;
}
