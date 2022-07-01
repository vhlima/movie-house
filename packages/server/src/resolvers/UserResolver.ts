import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import User, { UserModel } from '../models/User';

import { create, follow } from '../controllers/UserController';

@Resolver()
class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await UserModel.find();

    return users;
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
  async userFollow(@Arg('id') id: string, @Arg('targetId') targetId: string) {
    await follow(id, targetId);

    return 'Follow with sucess';
  }
}

export default UserResolver;
