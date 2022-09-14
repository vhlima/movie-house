import { ObjectId } from 'mongodb';

import { Field, ID, ObjectType } from 'type-graphql';

import { Column, Entity, ObjectIdColumn } from 'typeorm';

import Movie from './movie';

import MongoTimestamps from './timestamps.interface';

@ObjectType()
@Entity('users_lists_movies')
export default class UserListCustomMovie extends MongoTimestamps {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  readonly id: ObjectId;

  @ObjectIdColumn()
  listId: ObjectId;

  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column(() => Movie)
  movie: Movie;
}
