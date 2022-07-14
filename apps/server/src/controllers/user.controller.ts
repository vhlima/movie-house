import type { DocumentType } from '@typegoose/typegoose';

import User from '../entities/user.interface';

import { UserModel } from '../models';

export const findUserById = async (
  userId: string,
): Promise<DocumentType<User>> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
