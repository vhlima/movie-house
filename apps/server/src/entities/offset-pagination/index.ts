/* eslint-disable max-classes-per-file */

import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function OffsetPagination<T>(
  itemClass: () => ClassType<T>,
  prefix: string,
) {
  const ItemClass = itemClass();

  @ObjectType(`${prefix}OffsetPaginationInfo`)
  class OffsetPaginationInfo {
    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    maxPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field()
    hasNextPage: boolean;
  }

  @ObjectType(`${prefix}OffsetPaginationEdge`)
  class OffsetPaginationEdge {
    @Field()
    cursor: string;

    @Field(() => ItemClass)
    node: T;
  }

  @ObjectType(`${prefix}OffsetPagination`)
  class PaginationClass {
    @Field(() => [OffsetPaginationEdge])
    edges: OffsetPaginationEdge;

    @Field(() => OffsetPaginationInfo)
    pageInfo: OffsetPaginationInfo;
  }

  return PaginationClass;
}
