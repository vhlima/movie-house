import { ObjectType } from 'type-graphql';

import { Column, Entity } from 'typeorm';

import UserListMovie from '../user-list-movie';

import UserListType from '../../../../enums/UserListType';

@ObjectType()
@Entity('users_lists_movies')
export default class UserListPreMadeMovie extends UserListMovie {
  @Column({
    type: 'enum',
    enum: UserListType,
  })
  listType: UserListType;

  @Column()
  userId: string;
}
