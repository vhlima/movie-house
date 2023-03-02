import { User } from '../../domain/entities';

import { CreateUser } from '../../domain/usecases';

import { IGithubRepository, IUserRepository } from '../contracts';

import { BaseError, UserNotFoundError } from '../../domain/errors';

export class CreateUserService implements CreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly githubRepository: IGithubRepository,
  ) {}

  async handle(githubId: string): Promise<User> {
    const userExists = await this.userRepository.getUserByGithubId(githubId);

    if (userExists) {
      throw new BaseError(
        'UserAlreadyExists',
        'This user is already registered.',
        400,
      );
    }

    const githubUser = await this.githubRepository.getGithubUserById(githubId);

    if (!githubUser) {
      throw new UserNotFoundError();
    }

    const user = await this.userRepository.createUser(
      githubUser.id,
      githubUser.name,
      githubUser.avatar_url,
    );

    return user;
  }
}
