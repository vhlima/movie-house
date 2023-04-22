import { Field, Int, ObjectType } from 'type-graphql';

import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { MovieEntity } from './movie';
import { Timestamps } from './timestamps';

@ObjectType('MovieReference')
@Entity({ name: 'movies' })
export class MovieReferenceEntity extends Timestamps {
  @ObjectIdColumn({ name: '_id' })
  readonly id: string;

  @Field()
  @Column()
  referenceId: string;

  @Field(() => Int)
  @Column()
  movieId: number;

  @Field(() => MovieEntity)
  @Column()
  movie: MovieEntity;
}
