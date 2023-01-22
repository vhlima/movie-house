import { ObjectId } from 'mongodb';

import { Field, ObjectType } from 'type-graphql';

import { Column, Entity, ObjectIdColumn } from 'typeorm';

import Movie from './movie';

@ObjectType()
@Entity('review_movies')
export default class ReviewMovie {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column()
  reviewId: string;

  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column()
  movie: Movie;
}
