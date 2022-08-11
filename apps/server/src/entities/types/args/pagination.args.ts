import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export default class PaginationArgs {
  @Field(() => Int)
  first: number;

  @Field({ nullable: true })
  after?: string;
}
