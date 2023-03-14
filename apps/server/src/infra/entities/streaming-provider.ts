import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType('StreamingProvider')
export class StreamingProviderEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  displayPriority: number;

  @Field()
  logoPath: string;
}
