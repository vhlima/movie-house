import { Resolver, Arg, Query } from 'type-graphql';

import { UserLimitRepository } from '../repositories';

import NotFoundError from '../errors/NotFound';

import LimitType from '../enums/LimitType';

import Limit from '../entities/pg-entities/limit';

@Resolver()
export default class LimitResolver {
  @Query(() => Limit)
  async limit(@Arg('limitType', () => LimitType) limitType: LimitType) {
    const limitFound = await UserLimitRepository.findOneBy({ limitType });

    if (!limitFound) {
      throw new NotFoundError('Limit not found');
    }

    return limitFound;
  }
}
