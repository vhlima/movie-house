import { User } from '../entities';

export interface IsFollowing {
  handle(userId: string, session?: User | null): Promise<boolean>;
}
