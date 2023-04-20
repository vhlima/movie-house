import { ProfileStatsEntity } from '../../infra/entities';

export interface FindProfileStats {
  handle(userId: string): Promise<ProfileStatsEntity>;
}
