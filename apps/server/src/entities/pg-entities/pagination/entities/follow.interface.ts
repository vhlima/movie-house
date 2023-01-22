import { ObjectType } from 'type-graphql';

import Pagination from '..';

import Follow from '../../follow.interface';

@ObjectType()
export default class Followers extends Pagination<Follow>(
  Follow,
  'Followers',
) {}
