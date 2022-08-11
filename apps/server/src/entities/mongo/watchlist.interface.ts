import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import Movie from '../movie';

import Timestamps from '../timestamps.interface';

@ObjectType()
export default class WatchlistItem extends Timestamps {
  @Field(() => Movie)
  @Column(() => Movie)
  movie: Movie;
}
