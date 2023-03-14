import { Field, InputType } from 'type-graphql';

@InputType({ isAbstract: true })
export abstract class SortInput {
  @Field({ nullable: true })
  filter?: string;
}
