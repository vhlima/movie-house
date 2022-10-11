import { ObjectType } from 'type-graphql';

import Pagination from '..';

import UserListMovie from '../../mongo-entities/user-list/user-list-movie';

@ObjectType()
export default class UserListMovies extends Pagination<UserListMovie>(
  UserListMovie,
  'UserListMovie',
) {}
