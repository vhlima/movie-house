import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Movie from './movie.interface';

import Post from './post.interface';

@ObjectType()
export default class Review extends Post {
  @Field(() => Movie)
  @prop({ type: () => Movie })
  readonly movie: Movie;
}
