import { User } from '../entities';

export interface DeleteFollow {
  handle(userId: string, session?: User | null): Promise<boolean>;
}
