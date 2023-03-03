import {
  PaginationInputModel,
  ListSortTypeModel,
  PaginationPreResponseModel,
  ListModel,
} from '../models';

export interface IFindListsRepository {
  getLists(
    props: PaginationInputModel<ListSortTypeModel>,
    userId?: string,
  ): Promise<PaginationPreResponseModel<ListModel>>;
}
