import { PreMadeListType } from '../enums';
import { PreMadeListModel } from '../models';

export interface IPreMadeListRepository {
  // getUserPreMadeListById(
  //   userId: string,
  //   listId: string,
  // ): Promise<PreMadeListModel | null>;
  getPreMadeListByType(
    userId: string,
    listType: PreMadeListType,
  ): Promise<PreMadeListModel | null>;
  createPreMadeList(
    userId: string,
    listType: PreMadeListType,
  ): Promise<PreMadeListModel>;
}
