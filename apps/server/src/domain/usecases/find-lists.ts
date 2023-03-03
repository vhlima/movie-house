import {
  PaginationPreResponse,
  PaginationInput,
  List,
  ListSortType,
} from '../entities';

export interface FindLists {
  handle: (
    props: PaginationInput<ListSortType>,
    userId?: string,
  ) => Promise<PaginationPreResponse<List>>;
}
