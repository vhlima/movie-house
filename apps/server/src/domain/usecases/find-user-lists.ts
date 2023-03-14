import { List } from '../entities';

export interface FindUserLists {
  handle(userId: string): Promise<List[]>;
}
