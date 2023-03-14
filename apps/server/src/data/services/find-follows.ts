import { Pagination, Follow, PaginationInput } from '../../domain/entities';
import { UserNotFoundError } from '../../domain/errors';
import { FindFollows } from '../../domain/usecases';
import { IFollowRepository, IUserRepository } from '../contracts';
import { GetPaginationService } from './get-pagination';

const FOLLOWS_PER_PAGE = 10;

export class FindFollowsService implements FindFollows {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly followRepository: IFollowRepository,
  ) {}

  async handle(
    userId: string,
    { page }: PaginationInput,
    isFollowing?: boolean | undefined,
  ): Promise<Pagination<Follow>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const follows = await (isFollowing
      ? this.followRepository.getUserFollowings(userId, {
          page,
          itemsPerPage: FOLLOWS_PER_PAGE,
        })
      : this.followRepository.getUserFollowers(userId, {
          page,
          itemsPerPage: FOLLOWS_PER_PAGE,
        }));

    const paginationService = new GetPaginationService<Follow>();

    const followsPaginated = paginationService.handle(
      follows.items,
      page,
      FOLLOWS_PER_PAGE,
      follows.totalCount,
    );

    return followsPaginated;
  }
}
