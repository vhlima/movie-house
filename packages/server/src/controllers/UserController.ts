import { v4 as uuid } from 'uuid';

import User, { UserModel } from '../models/User';

export const create = async (
  username: string,
  realName: string,
): Promise<User> => {
  const userCreated = await UserModel.create({
    username,
    realName,
    followers: [],
  });

  return userCreated;
};

export const follow = async (id: string, targetId: string) => {
  const user = await UserModel.findById(id);

  if (!user) return;

  const targetUser = await UserModel.findById(targetId);

  if (!targetUser) return;

  await UserModel.updateOne(
    { id },
    { following: [...(user.following || []), targetUser.id] },
  );

  await UserModel.updateOne(
    { targetId },
    { followers: [...(targetUser.followers || []), user.id] },
  );
};
