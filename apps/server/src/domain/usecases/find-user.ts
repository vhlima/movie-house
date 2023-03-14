import { User } from '../entities';

export interface CreateUser {
  handle: (githubId: string) => Promise<User>;
}
