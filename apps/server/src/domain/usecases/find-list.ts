import { List } from '../entities';

export interface FindList {
  handle: (listId: string) => Promise<List>;
}
