import { User } from '../../domain/entities';

import { FindUser } from '../../domain/usecases';

import { IUserRepository } from '../contracts';

import { UserNotFoundError } from '../../domain/errors';

export class FindUserService implements FindUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(userId: string, searchByUsername?: boolean): Promise<User> {
    const userExists = await (!searchByUsername
      ? this.userRepository.getUserById(userId)
      : this.userRepository.getUserByUsername(userId));

    if (!userExists) {
      throw new UserNotFoundError();
    }

    return userExists;
  }
}
