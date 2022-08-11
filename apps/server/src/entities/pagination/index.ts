/* eslint-disable max-classes-per-file */

import { ClassType, Field, ObjectType } from 'type-graphql';

export default function Pagination<T>(ItemClass: ClassType<T>) {
  @ObjectType()
  class PaginationInfo {
    @Field({ nullable: true })
    endCursor?: string;

    @Field()
    hasNextPage: boolean;
  }

  @ObjectType()
  abstract class PaginationEdge {
    @Field()
    cursor: string;

    @Field(() => ItemClass)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginationClass {
    @Field(() => [PaginationEdge])
    edges: PaginationEdge;

    @Field(() => PaginationInfo)
    pageInfo: PaginationInfo;
  }

  return PaginationClass;
}
