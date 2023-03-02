import { ClassType, Field, Int, ObjectType } from 'type-graphql';

import { TypeValue } from 'type-graphql/dist/decorators/types';

import {
  PaginationInfo as IPaginationInfo,
  Pagination as IPagination,
  PaginationEdge as IPaginationEdge,
} from '../../domain/entities';

@ObjectType()
class PaginationInfo implements IPaginationInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}

export function createPagination<T extends TypeValue>(
  name: string,
  nodeType: () => ClassType<T>,
) {
  const NodeType = nodeType();

  @ObjectType(`${name}Edge`)
  class PaginationEdge implements IPaginationEdge<T> {
    @Field(() => NodeType)
    node: T;
  }

  @ObjectType(`${name}Pagination`)
  class Pagination implements IPagination<T> {
    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    totalCount: number;

    @Field()
    pageInfo: PaginationInfo;

    @Field(() => [PaginationEdge])
    edges: PaginationEdge[];
  }

  return Pagination;
}
