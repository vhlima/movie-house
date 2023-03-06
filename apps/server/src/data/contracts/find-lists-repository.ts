import { List } from '../../domain/entities';
import { ListSortType } from '../enums';
import { PaginationInputModel, PaginationPreResponseModel } from '../models';

export interface IFindListsRepository {
  getLists(
    props: PaginationInputModel<ListSortType>,
    userId?: string,
  ): Promise<PaginationPreResponseModel<List>>;
}
