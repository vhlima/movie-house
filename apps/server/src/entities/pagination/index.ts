import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class Pagination {
  @Field(() => Int)
  currentPage: number;

  @Field()
  hasNextPage: boolean;
}
