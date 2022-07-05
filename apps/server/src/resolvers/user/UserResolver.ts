import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import User from '../../models/user/User';

import { UserModel } from '../../models/user';

import { create, login, follow, unfollow } from '../../controllers/user';

@Resolver()
class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await UserModel.find();

    return users;
  }

  @Mutation(() => User)
  async userLogin(@Arg('username') username: string) {
    const user = await login(username);

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('realName') realName: string,
    @Arg('username') username: string,
  ) {
    const user = await create(username, realName);

    return user;
  }

  @Mutation(() => String)
  async userFollow(
    @Arg('_userId') userId: string,
    @Arg('_targetId') targetId: string,
  ) {
    try {
      await follow(userId, targetId);

      return 'Follow with sucess';
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => String)
  async userUnfollow(
    @Arg('_userId') userId: string,
    @Arg('_targetId') targetId: string,
  ) {
    try {
      await unfollow(userId, targetId);

      return 'Unfollow with sucess';
    } catch (err) {
      return err;
    }
  }
}

export default UserResolver;
