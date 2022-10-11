import { ObjectType } from 'type-graphql';

import OffsetPagination from '..';

import UserListPremadeMovie from '../../mongo-entities/user-list/premade/user-list-premade-movie';

@ObjectType()
export default class UserListPreMadeMovies extends OffsetPagination<UserListPremadeMovie>(
  () => UserListPremadeMovie,
  'UserListPreMadeMovies',
) {}
