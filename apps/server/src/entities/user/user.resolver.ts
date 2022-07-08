import { Resolver, Mutation, Arg } from 'type-graphql';

import { createCrudResolver } from '../base/crud.resolver';

import { login, follow, unfollow } from './user.controller';

import { UserModel } from './user.models';

import User from './user.interface';

import UserInput from './user.input';

const UserBaseResolver = createCrudResolver('User', User, UserInput, UserModel);

@Resolver(() => User)
class UserResolver extends UserBaseResolver {
  @Mutation(() => User)
  async userLogin(@Arg('username') username: string) {
    const user = await login(username);

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
