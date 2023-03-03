import { List } from '../../domain/entities';
import {
  PaginationInputModel,
  ListSortTypeModel,
  PaginationPreResponseModel,
} from '../models';

export interface IFindListsRepository {
  getLists(
    props: PaginationInputModel<ListSortTypeModel>,
    userId?: string,
  ): Promise<PaginationPreResponseModel<List>>;
}
