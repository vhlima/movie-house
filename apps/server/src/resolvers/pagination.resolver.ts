import { MoreThan } from 'typeorm';

import type {
  Repository,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
} from 'typeorm';

interface EntityPaginationProp {
  createdAt: Date;
}

interface PaginationProps<Entity extends EntityPaginationProp> {
  repository: Repository<Entity>;
  first: number;
  cursor?: Date | string;
  findOptions?: FindManyOptions<Entity>;
}

// TODO find a way to return pagination result from entity paginated class, not from this interface

interface PaginationResult<Entity extends EntityPaginationProp> {
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
  };
  edges: Array<{
    cursor: string;
    node: Entity;
  }>;
}

/**
 * This function returns paginated content based on cursor
 * but it doesn't find for endCursor and hasNextPage
 * to receive that you must use the @method findWithPagination
 *
 * @returns X amount of entities based on cursor
 */
const findPageContent = async <Entity extends EntityPaginationProp>({
  repository,
  first,
  cursor,
  findOptions,
}: PaginationProps<Entity>): Promise<Entity[]> => {
  const whereParams = findOptions?.where || {};

  if (cursor) {
    Object.assign(whereParams, {
      createdAt: MoreThan(
        typeof cursor === 'string' ? new Date(cursor) : cursor,
      ),
    } as FindOptionsWhere<Entity>);
  }

  const paginationResult = await repository.find({
    ...findOptions,
    where: whereParams,
    take: first,
    skip: !cursor ? 0 : 1,
    order: {
      createdAt: 'ASC',
    } as FindOptionsOrder<Entity>,
  });

  return paginationResult;
};

/**
 * Returns paginated content based on cursor
 * @returns X amount of entities based on cursor
 */
export const findWithPagination = async <Entity extends EntityPaginationProp>({
  repository,
  first,
  cursor,
  findOptions,
}: PaginationProps<Entity>): Promise<PaginationResult<Entity>> => {
  const paginationResult = await findPageContent({
    repository,
    first,
    cursor,
    findOptions,
  });

  if (paginationResult.length <= 0) {
    return { edges: [], pageInfo: { hasNextPage: false } };
  }

  const endCursor = paginationResult[paginationResult.length - 1].createdAt;

  const nextPaginationResult = await findPageContent<Entity>({
    first: 1,
    cursor: endCursor,
    repository,
    findOptions,
  });

  const hasNextPage = nextPaginationResult.length > 0;

  return {
    edges: paginationResult.map(entity => ({
      cursor: entity.createdAt.toISOString(),
      node: entity,
    })),
    pageInfo: {
      endCursor: hasNextPage ? endCursor.toISOString() : undefined,
      hasNextPage,
    },
  };
};
