import { User } from '../entities';

export interface DeleteList {
  handle(listId: string, session?: User | null): Promise<boolean>;
}
