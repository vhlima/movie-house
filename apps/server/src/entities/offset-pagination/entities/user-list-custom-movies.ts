import { ObjectType } from 'type-graphql';

import OffsetPagination from '..';

import UserListCustomMovie from '../../mongo-entities/user-list/custom/user-list-custom-movie';

@ObjectType()
export default class UserListCustomMovies extends OffsetPagination<UserListCustomMovie>(
  () => UserListCustomMovie,
  'UserListCustomMovies',
) {}
