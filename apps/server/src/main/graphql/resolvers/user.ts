import { Arg, Query, Mutation, Resolver } from 'type-graphql';

import { UserEntity } from '../../../infra/entities';

import { getFindUserService, getCreateUserService } from '../../factories';

@Resolver(() => UserEntity)
export class UserResolver {
  @Query(() => UserEntity)
  async user(@Arg('username') username: string) {
    const findUserService = getFindUserService();

    const userResponse = await findUserService.handle(username, true);

    return userResponse;
  }

  @Query(() => UserEntity)
  async userById(@Arg('userId') userId: string) {
    const findUserService = getFindUserService();

    const userResponse = await findUserService.handle(userId);

    return userResponse;
  }

  @Mutation(() => UserEntity)
  async createUser(@Arg('githubId') githubId: string) {
    const createUserController = getCreateUserService();

    const userResponse = await createUserController.handle(githubId);

    return userResponse;
  }
}
