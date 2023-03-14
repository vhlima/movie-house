import { List, User } from '../entities';

export interface CreateList {
  handle: (
    name: string,
    content?: string,
    session?: User | null,
  ) => Promise<List>;
}
