import { Field, ObjectType } from 'type-graphql';

import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { ObjectId } from 'mongodb';

import Movie from './movie';

import MongoTimestamps from './timestamps.interface';

/* 
  This entity can store movies from any type of lists 
  Currently being used on Lists and PreMadeLists
*/

@ObjectType()
@Entity('list_movies')
export default class ListMovie extends MongoTimestamps {
  @ObjectIdColumn({ name: '_id' })
  readonly id: ObjectId;

  @Column()
  listId: string;

  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column()
  movie: Movie;
}
