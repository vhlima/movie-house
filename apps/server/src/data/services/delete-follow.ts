import { User } from '../../domain/entities';
import { AuthenticationError, UserNotFoundError } from '../../domain/errors';
import { DeleteFollow } from '../../domain/usecases';
import { IFollowRepository, IUserRepository } from '../contracts';

export class DeleteFollowService implements DeleteFollow {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly followRepository: IFollowRepository,
  ) {}

  async handle(userId: string, session?: User | null): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const user = this.userRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isFollowing = await this.followRepository.isFollowing(
      session.id,
      userId,
    );

    if (!isFollowing) {
      return false;
    }

    const unfollowResponse = await this.followRepository.deleteFollow(
      session.id,
      userId,
    );

    return unfollowResponse;
  }
}
