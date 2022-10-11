import { ObjectId } from 'mongodb';

import { FindManyOptions, Repository } from 'typeorm';

type EntityType = unknown & { id: string | ObjectId };

// TODO we dont need that, we must use class insead of interface
interface OffsetPaginationResult<Entity extends EntityType> {
  pageInfo: {
    totalCount: number;

    maxPages: number;
    currentPage: number;
    hasNextPage: boolean;
  };
  edges: Array<{
    cursor: string;
    node: Entity;
  }>;
}

interface OffsetPaginationProps<Entity extends EntityType> {
  repository: Repository<Entity>;
  findOptions?: FindManyOptions<Entity>;

  first: number;
  offset?: number;
}

/**
 * This function returns paginated content based on offset
 * but it doesn't find for pageInfo props.
 * To find that you must use the @method findWithOffsetPagination
 *
 * @param {Number} first How many elements you want to find
 * @param {Number} offset How many elements you want to skip
 *
 * @returns First X entities based on offset
 */
const findPageContent = async <Entity extends EntityType>({
  repository,
  findOptions,
  first,
  offset,
}: OffsetPaginationProps<Entity>): Promise<Entity[]> => {
  const paginationResult = await repository.find({
    ...findOptions,
    where: { ...findOptions?.where },
    take: first,
    skip: offset || 0,
    // order: {
    //   createdAt: 'ASC',
    // } as FindOptionsOrder<Entity>,
  });

  return paginationResult;
};

/**
 * Returns paginated content based on offset
 *
 * @param {Number} first How many elements you want to find
 * @param {Number} offset How many elements you want to skip
 *
 * @returns X amount of entities based on offset
 */
export const findWithOffsetPagination = async <Entity extends EntityType>({
  repository,
  findOptions,
  first,
  offset,
}: OffsetPaginationProps<Entity>): Promise<OffsetPaginationResult<Entity>> => {
  const paginationResult = await findPageContent({
    repository,
    findOptions,
    first,
    offset,
  });

  if (paginationResult.length <= 0) {
    return {
      edges: [],
      pageInfo: {
        totalCount: 0,

        maxPages: 1,
        currentPage: 1,
        hasNextPage: false,
      },
    };
  }

  const totalCount = await repository.countBy({ ...findOptions?.where });

  const maxPages = Math.ceil(totalCount / first);

  const currentPage = !offset ? 1 : 1;

  const nextPaginationResult = await findPageContent({
    repository,
    findOptions,
    first,
    offset: offset || 0 + 1,
  });

  return {
    edges: paginationResult.map(entity => ({
      cursor: typeof entity.id === 'string' ? entity.id : entity.id.toString(),
      node: entity,
    })),
    pageInfo: {
      totalCount,

      maxPages,
      currentPage,
      hasNextPage: nextPaginationResult.length === first,
    },
  };
};
