import { Resolver, Mutation, Arg, Query, Ctx, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import { UserRepository, UserProviderRepository } from '../repositories';

import User from '../entities/pg-entities/user.interface';

import UserFieldsInput from '../inputs/user-fields.input';

import UserNotFoundError from '../errors/UserNotFound';
import AuthenticationError from '../errors/Authentication';

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  async user(@Arg(`username`) username: string) {
    const user = await UserRepository.findOneBy({ username });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Query(() => User)
  async userByProvider(
    @Arg('provider') provider: string,
    @Arg('providerId') providerId: string,
  ) {
    const userProvider = await UserProviderRepository.findOne({
      where: {
        provider,
        providerId,
      },
    });

    if (!userProvider) {
      throw new UserNotFoundError();
    }

    const user = await UserRepository.findOneBy({ id: userProvider.userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Ctx() { user }: ServerContext,
    @Arg('data') data: UserFieldsInput,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const updatedUser = await UserRepository.update(user.id, { ...data });

    return updatedUser;
  }

  @Mutation(() => Boolean)
  async register(
    @Ctx() context: ServerContext,
    @Arg('githubId', () => Int) githubId: number,
  ) {
    const githubUser = await context.dataSources.github.getGithubUserById(
      githubId,
    );

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

    await UserRepository.save(user);

    const userProvider = UserProviderRepository.create({
      userId: user.id,
      provider: 'github',
      providerId: String(githubUser.id),
    });

    await UserProviderRepository.save(userProvider);

    return true;
  }
}

export default UserResolver;
