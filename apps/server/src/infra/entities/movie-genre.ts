import { Field, Int, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import { MovieGenre } from '../../domain/entities';

@ObjectType('MovieGenre')
export class MovieGenreEntity implements MovieGenre {
  @Field(() => Int)
  @Column()
  id: number;

  @Field()
  @Column()
  name: string;
}
