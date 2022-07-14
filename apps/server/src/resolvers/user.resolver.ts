import { Resolver, Mutation, Arg, Query, Args } from 'type-graphql';

import { UserModel } from '../models';

import { findUserById } from '../controllers/user.controller';

import User from '../entities/user.interface';

import UserArgs from '../entities/types/args/user.args';

@Resolver(() => User)
class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await UserModel.find();

    return users;
  }

  @Query(() => User)
  async user(@Arg(`userId`) userId: string): Promise<User> {
    const user = await findUserById(userId);

    return user;
  }

  @Mutation(() => User)
  async login(@Arg('username') username: string) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  async register(@Args() { username }: UserArgs) {
    const userExists = await UserModel.findOne({ username });

    if (userExists) {
      throw new Error('Username already taken');
    }

    const user = await UserModel.create({ username });

    return user;
  }
}

export default UserResolver;
