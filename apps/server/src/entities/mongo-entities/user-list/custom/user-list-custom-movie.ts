import { ObjectId } from 'mongodb';

import { ObjectType } from 'type-graphql';

import { Entity, ObjectIdColumn } from 'typeorm';

import UserListMovie from '../user-list-movie';

@Entity('users_lists_movies')
@ObjectType()
export default class UserListCustomMovie extends UserListMovie {
  @ObjectIdColumn({ nullable: true })
  listId: ObjectId;
}
