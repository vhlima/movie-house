import { ProfileStats } from '../../domain/entities';
import { UserNotFoundError } from '../../domain/errors';
import { FindProfileStats } from '../../domain/usecases';

import { IListRepository, IUserRepository } from '../contracts';
import { PreMadeListType } from '../enums';

import { GetPreMadeListMovieCountService } from './get-pre-made-list-movie-count';

export class FindProfileStatsService implements FindProfileStats {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly listRepository: IListRepository,
    private readonly getPreMadeListMovieCountService: GetPreMadeListMovieCountService,
  ) {}

  async handle(userId: string): Promise<ProfileStats> {
    const userExists = await this.userRepository.getUserById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    // const followerCount = await FollowRepository.countBy({
    //   targetUserId: user.id,
    // });

    // const followingCount = await FollowRepository.countBy({
    //   userId: user.id,
    // });

    const listCount = await this.listRepository.getUserListCount(userId);

    const moviesWatchedCount =
      await this.getPreMadeListMovieCountService.handle(
        userId,
        PreMadeListType.WATCHED,
      );

    const currentYear = new Date().getFullYear();

    const moviesWatchedThisYearCount =
      await this.getPreMadeListMovieCountService.handle(
        userId,
        PreMadeListType.WATCHED,
        new Date(`${currentYear}-01-01T00:00:00.000Z`),
        new Date(`${currentYear}-12-31T23:59:59.999Z`),
      );

    return {
      followerCount: 0,
      followingCount: 0,
      moviesWatchedThisYearCount,
      listCount,
      moviesWatchedCount,
    };
  }
}
