import { Field, Int, ObjectType } from 'type-graphql';
import { MoviePersonEntity } from './movie-person';

@ObjectType('MovieCrewMember')
export class MovieCrewMemberEntity extends MoviePersonEntity {
  @Field()
  creditId: string;

  @Field()
  department: string;

  @Field(() => Int)
  job: number;
}
