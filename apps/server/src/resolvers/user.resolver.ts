import { Resolver, Mutation, Arg, Query, Args, Ctx, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import { UserRepository } from '../repositories';

import User from '../entities/pg-entities/user.interface';

import UserInput from '../entities/types/user.input';

import UserNotFoundError from '../errors/UserNotFound';

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  async user(@Arg(`username`) username: string): Promise<User> {
    const user = await UserRepository.findOneBy({ username });

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

  @Mutation(() => Boolean)
  async register(
    @Ctx() { dataSources }: ServerContext,
    @Arg('githubId', () => Int) githubId: number,
  ) {
    const githubUser = await dataSources.github.getGithubUserById(githubId);

    if (!githubUser) {
      throw new UserNotFoundError();
    }

    const userExists = await UserRepository.findOneBy({
      username: githubUser.login,
    });

    if (userExists) {
      return false;
    }

    const user = UserRepository.create({
      username: githubUser.login,
      realName: githubUser.name,
      profilePictureUrl: githubUser.avatar_url,
    });

    // user.profilePictureUrl =
    //   'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6';

    await UserRepository.save(user);

    return true;
  }
}

export default UserResolver;
