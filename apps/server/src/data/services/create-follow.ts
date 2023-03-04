import { User } from '../../domain/entities';
import {
  AuthenticationError,
  BaseError,
  UserNotFoundError,
} from '../../domain/errors';
import { CreateFollow } from '../../domain/usecases';
import { IFollowRepository, IUserRepository } from '../contracts';

export class CreateFollowService implements CreateFollow {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly followRepository: IFollowRepository,
  ) {}

  async handle(userId: string, session?: User | null): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.id === session.id) {
      throw new BaseError(
        'CantFollowSelfError',
        'You cant follow yourself.',
        400,
      );
    }

    const isFollowing = await this.followRepository.isFollowing(
      session.id,
      userId,
    );

    if (isFollowing) {
      return false;
    }

    const followResponse = await this.followRepository.createFollow(
      session.id,
      userId,
    );

    return followResponse;
  }
}
