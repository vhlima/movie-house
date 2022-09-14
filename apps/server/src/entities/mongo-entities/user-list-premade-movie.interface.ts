import { ObjectId } from 'mongodb';

import { Field, ObjectType, Root } from 'type-graphql';

import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { UserRepository } from '../../repositories';

import UserListType from '../../enums/UserListType';

import User from '../pg-entities/user.interface';

import NotFoundError from '../../errors/NotFound';
import Movie from './movie';

@ObjectType()
@Entity('users_lists_movies')
export default class UserListPremadeMovie {
  @ObjectIdColumn({ name: '_id' })
  readonly id: ObjectId;

  @Column({
    type: 'enum',
    enum: UserListType,
  })
  listType: UserListType;

  @Column()
  userId: string;

  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column(() => Movie)
  movie: Movie;

  @Field(() => User)
  async user(@Root() list: UserListPremadeMovie) {
    const user = await UserRepository.findOneBy({ id: list.userId });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
