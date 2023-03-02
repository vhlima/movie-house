import { User } from '../entities';

export interface FindUser {
  handle: (userId: string, searchByUsername?: boolean) => Promise<User>;
}
