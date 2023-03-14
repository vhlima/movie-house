import { Pagination, PaginationInput, ListPreview } from '../entities';
import { ListSortType } from '../enums';

export interface FindLists {
  handle: (
    props: PaginationInput<ListSortType>,
    userId?: string,
  ) => Promise<Pagination<ListPreview>>;
}
