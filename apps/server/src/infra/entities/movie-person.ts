import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export abstract class MoviePersonEntity {
  @Field(() => Int)
  id: number;

  @Field()
  adult: boolean;

  @Field()
  gender: number;

  @Field()
  knownForDepartment: string;

  @Field({ nullable: true })
  profilePath?: string;

  @Field()
  name: string;

  @Field()
  originalName: string;

  @Field()
  popularity: number;

  @Field()
  profilePictureUrl: string;
}
