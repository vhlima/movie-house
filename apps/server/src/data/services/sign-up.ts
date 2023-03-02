import { SignUp } from '../../domain/usecases';

import { UserNotFoundError } from '../../domain/errors';

import { IGithubRepository, IUserRepository } from '../contracts';

export class SignUpService implements SignUp {
  constructor(
    private readonly githubRepository: IGithubRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async handle(githubId: string): Promise<boolean> {
    const githubUser = await this.githubRepository.getGithubUserById(githubId);

    if (!githubUser) {
      throw new UserNotFoundError();
    }

    const userExists = await this.userRepository.getUserByGithubId(githubId);

    if (userExists) {
      return false;
    }

    await this.userRepository.createUser(
      githubId,
      githubUser.login,
      githubUser.avatar_url,
    );

    return true;
  }
}
