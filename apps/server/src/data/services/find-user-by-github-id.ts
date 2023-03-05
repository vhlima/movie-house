import { User } from '../../domain/entities';

import { FindUserByGithubId } from '../../domain/usecases';

import { IUserRepository } from '../contracts';

import { UserNotFoundError } from '../../domain/errors';

export class FindUserByGithubIdService implements FindUserByGithubId {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(githubId: string): Promise<User> {
    const userExists = await this.userRepository.getUserByGithubId(githubId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    return userExists;
  }
}
