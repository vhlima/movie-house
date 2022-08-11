import User from '../entities/postgres/user.interface';

import { UserRepository } from '../repositories';

export const findUserById = async (userId: string): Promise<User> => {
  const user = await UserRepository.findOneBy({ id: userId });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
