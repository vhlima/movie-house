import { Field, Float, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import Movie from '../movie';

@ObjectType()
export default class Rate {
  @Field(() => Movie)
  @Column(() => Movie)
  movie: Movie;

  @Field(() => Float)
  @Column()
  rating: number;

  @Field()
  @Column()
  liked: boolean;

  @Field()
  @Column()
  watched: boolean;
}
