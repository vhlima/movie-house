import { ListModel } from '../models';

export interface IListRepository {
  getListById(listId: string): Promise<ListModel | null>;
  getUserListById(userId: string, listId: string): Promise<ListModel | null>;
  getUserListByName(userId: string, name: string): Promise<ListModel | null>;
  getUserListCount(userId: string): Promise<number>;
  createList(postId: string, name: string): Promise<ListModel>;
  deleteList(listId: string): Promise<boolean>;
}
