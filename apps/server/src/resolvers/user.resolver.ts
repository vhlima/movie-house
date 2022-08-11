import { Resolver, Mutation, Arg, Query, Args } from 'type-graphql';

import { UserRepository } from '../repositories';

import User from '../entities/postgres/user.interface';

import UserArgs from '../entities/types/args/user.args';

import UserInput from '../entities/types/user.input';

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  async user(@Arg(`userId`) userId: string): Promise<User> {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('userId') userId: string,
    @Arg('data') data: UserInput,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return user;

    // const user = await UserModel.findByIdAndUpdate(userId, { ...data });

    // if (!user) {
    //   throw new Error('User not found');
    // }

    // return user;
  }

  @Mutation(() => User)
  async login(@Arg('username') username: string) {
    const user = await UserRepository.findOneBy({ username });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  async register(@Args() { username }: UserArgs) {
    const userExists = await UserRepository.findOneBy({ username });

    if (userExists) {
      throw new Error('Username already taken');
    }

    const user = UserRepository.create({
      username,
    });

    await UserRepository.save(user);

    return user;
  }
}

export default UserResolver;
