import { Field, Int, ObjectType } from 'type-graphql';
import { MoviePersonEntity } from './movie-person';

@ObjectType()
export class MovieCharacterEntity extends MoviePersonEntity {
  @Field(() => Int)
  castId: number;

  @Field()
  creditId: string;

  @Field()
  character: string;

  @Field(() => Int)
  order: number;
}
