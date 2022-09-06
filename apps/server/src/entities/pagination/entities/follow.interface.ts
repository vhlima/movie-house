import { ObjectType } from 'type-graphql';

import Pagination from '..';

import Follow from '../../postgres/follow.interface';

@ObjectType()
export default class Followers extends Pagination<Follow>(
  Follow,
  'Followers',
) {}
