import { Field, Float, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Movie from '../../movie/movie.interface';

import Review from '../review/review.interface';

@ObjectType()
export default class MovieInfo {
  @Field(() => Movie)
  @prop({ type: () => Movie })
  movie: Movie;

  @Field(() => Float)
  @prop()
  rating: number;

  @Field()
  @prop()
  liked: boolean;

  @Field()
  @prop()
  watched: boolean;

  @Field(() => Review, { nullable: true })
  @prop({ type: () => Review, required: false })
  review?: Review;
}
