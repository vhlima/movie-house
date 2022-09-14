/* eslint-disable max-classes-per-file */

import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function Pagination<T>(ItemClass: ClassType<T>, prefix: string) {
  @ObjectType(`${prefix}PaginationInfo`)
  class PaginationInfo {
    @Field({ nullable: true })
    endCursor?: string;

    @Field(() => Int)
    maxItems: number;

    @Field()
    hasNextPage: boolean;
  }

  @ObjectType(`${prefix}PaginationEdge`)
  abstract class PaginationEdge {
    @Field()
    cursor: string;

    @Field(() => ItemClass)
    node: T;
  }

  @ObjectType(`${prefix}Pagination`, { isAbstract: true })
  abstract class PaginationClass {
    @Field(() => [PaginationEdge])
    edges: PaginationEdge;

    @Field(() => PaginationInfo)
    pageInfo: PaginationInfo;
  }

  return PaginationClass;
}
