import { ObjectId } from 'mongodb';

import { Field, ID, ObjectType } from 'type-graphql';

import { Column, ObjectIdColumn } from 'typeorm';

import Movie from '../movie';

import MongoTimestamps from '../timestamps.interface';

/* This class will only be used to extends in UserListMovieCustom and UserListMoviePremade */
@ObjectType()
export default class UserListMovie extends MongoTimestamps {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  readonly id: ObjectId;

  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column(() => Movie)
  movie: Movie;
}
