import { User } from '../entities';

export interface CreateFollow {
  handle(userId: string, session?: User | null): Promise<boolean>;
}
