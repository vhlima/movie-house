import User from './index';

import { UserModel } from './user.models';

export const login = async (username: string) => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const interactWithTarget = async (
  userId: string,
  targetId: string,
): Promise<[User, User]> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const targetUser = await UserModel.findById(targetId);

  if (!targetUser) {
    throw new Error('Target not found');
  }

  return [user, targetUser];
};

export const follow = async (userId: string, targetId: string) => {
  const [user, targetUser] = await interactWithTarget(userId, targetId);

  if (user.following.includes(targetUser._id)) {
    throw new Error('User already follows target');
  }

  if (targetUser.followers.includes(user._id)) {
    throw new Error('Target is already followed by user');
  }

  await UserModel.updateOne(
    { _id: userId },
    { following: [...user.following, targetId] },
  );

  await UserModel.updateOne(
    { _id: targetId },
    { followers: [...targetUser.followers, userId] },
  );
};

export const unfollow = async (userId: string, targetId: string) => {
  const [user, targetUser] = await interactWithTarget(userId, targetId);

  if (!user.following.includes(targetUser._id)) {
    throw new Error('User does not follow target');
  }

  if (!targetUser.followers.includes(user._id)) {
    throw new Error('Target is not followed by user');
  }

  await UserModel.updateOne(
    { _id: userId },
    {
      following: user.following.filter(u => u === targetId),
    },
  );

  await UserModel.updateOne(
    { _id: targetId },
    {
      followers: targetUser.followers.filter(u => u === userId),
    },
  );
};
