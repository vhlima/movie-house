import {
  Pagination,
  PaginationInput,
  ListSortType,
  ListPreview,
} from '../entities';

export interface FindLists {
  handle: (
    props: PaginationInput<ListSortType>,
    userId?: string,
  ) => Promise<Pagination<ListPreview>>;
}
