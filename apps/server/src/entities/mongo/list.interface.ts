import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import Movie from '../movie';

import Post from './post.interface';

@ObjectType()
export default class List extends Post {
  @Field(() => [Movie])
  @Column(() => Movie)
  movies: Movie[];
}
