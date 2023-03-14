import type { IUserRepository } from '../../data/contracts';

import { PostgresDataSource } from '../data-sources';

import { User } from '../../domain/entities';

import { UserEntity } from '../entities';

export class UserRepository implements IUserRepository {
  private getUserRepository() {
    return PostgresDataSource.getRepository(UserEntity);
  }

  async getUserById(userId: string) {
    const userRepository = this.getUserRepository();

    const user = await userRepository.findOneBy({
      id: userId,
    });

    return user;
  }

  async getUserByUsername(username: string) {
    const userRepository = this.getUserRepository();

    const user = await userRepository.findOneBy({
      username,
    });

    return user;
  }

  async getUserByGithubId(githubId: string): Promise<User | null> {
    const userRepository = this.getUserRepository();

    const user = await userRepository.findOneBy({
      providerId: githubId,
    });

    return user;
  }

  async getGithubUserById(githubId: string) {
    // const githubUser = await githubRepository.getGithubUser(githubId);

    return {
      id: '66486598',
      login: 'vhlima',
      /* eslint-disable-next-line */
      avatar_url: 'https://avatars.githubusercontent.com/u/66486598',
      name: 'Victor Hugo Lima',
    };
  }

  async createUser(
    githubId: string,
    username: string,
    profilePictureUrl?: string | undefined,
  ): Promise<User> {
    const userRepository = this.getUserRepository();

    const user = userRepository.create({
      providerId: githubId,
      username,
      profilePictureUrl,
    });

    await userRepository.save(user);

    return user;
  }
}
