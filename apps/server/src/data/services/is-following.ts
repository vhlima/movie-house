import { User } from '../../domain/entities';
import { AuthenticationError } from '../../domain/errors';
import { IsFollowing } from '../../domain/usecases';
import { IFollowRepository } from '../contracts';

export class IsFollowingService implements IsFollowing {
  constructor(private readonly followRepository: IFollowRepository) {}

  async handle(
    userId: string,
    session?: User | null | undefined,
  ): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const isFollowing = this.followRepository.isFollowing(session.id, userId);

    return isFollowing;
  }
}
