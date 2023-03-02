import { ProfileStatsModel } from '../models';

export interface IPreMadeListRepository {
  getProfileStatsByUserId(userId: string): Promise<ProfileStatsModel>;
}
