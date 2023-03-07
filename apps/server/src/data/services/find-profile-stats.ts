import { ProfileStats } from '../../domain/entities';
import { UserNotFoundError } from '../../domain/errors';
import { FindProfileStats } from '../../domain/usecases';
import { getStartAndEndOfYear } from '../../utils/date-utils';

import {
  IFollowRepository,
  IListRepository,
  IUserRepository,
} from '../contracts';
import { PreMadeListType } from '../enums';

import { GetPreMadeListMovieCountService } from './get-pre-made-list-movie-count';

export class FindProfileStatsService implements FindProfileStats {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly listRepository: IListRepository,
    private readonly followRepository: IFollowRepository,
    private readonly getPreMadeListMovieCountService: GetPreMadeListMovieCountService,
  ) {}

  async handle(userId: string): Promise<ProfileStats> {
    const userExists = await this.userRepository.getUserById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const followerCount = await this.followRepository.getUserFollowerCount(
      userId,
    );

    const followingCount = await this.followRepository.getUserFollowingCount(
      userId,
    );

    const listCount = await this.listRepository.getUserListCount(userId);

    const moviesWatchedCount =
      await this.getPreMadeListMovieCountService.handle(
        userId,
        PreMadeListType.WATCHED,
      );

    const [start, end] = getStartAndEndOfYear(new Date().getFullYear());

    const moviesWatchedThisYearCount =
      await this.getPreMadeListMovieCountService.handle(
        userId,
        PreMadeListType.WATCHED,
        start,
        end,
      );

    return {
      followerCount,
      followingCount,
      moviesWatchedThisYearCount,
      listCount,
      moviesWatchedCount,
    };
  }
}
