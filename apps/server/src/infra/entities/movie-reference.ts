import { Field, Int, ObjectType } from 'type-graphql';

import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { MovieEntity } from './movie';

@ObjectType('MovieReference')
@Entity('movies')
export class MovieReferenceEntity {
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
