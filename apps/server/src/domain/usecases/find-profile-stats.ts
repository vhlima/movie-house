import { ProfileStats } from '../../infra/entities';

export interface FindProfileStats {
  handle(userId: string): Promise<ProfileStats>;
}
