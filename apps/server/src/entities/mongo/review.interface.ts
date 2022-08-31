import { Field, ObjectType } from 'type-graphql';

import { Column, Entity } from 'typeorm';

import Post from './post.interface';

import Movie from '../movie';

@ObjectType()
@Entity('reviews')
export default class Review extends Post {
  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column()
  movie: Movie;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pinned?: boolean;
}
