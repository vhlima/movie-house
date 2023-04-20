import { faker } from '@faker-js/faker';

import { FindListsQuery } from '@/graphql';

import { mockMovie } from './index';

export function mockList(): FindListsQuery['lists']['edges'][number]['node'] {
  return {
    id: faker.datatype.uuid(),
    movieCount: faker.datatype.number(),
    movies: [],
    name: faker.word.noun(),
    isPrivate: false,
    user: {
      username: faker.internet.userName(),
      profilePictureUrl: faker.internet.avatar(),
    },
    post: {
      id: faker.datatype.uuid(),
      content: faker.lorem.lines(2),
    },
  };
}

export function mockLists(amount: number): FindListsQuery {
  const movies = Array.from({ length: amount }).map(() => ({
    node: {
      ...mockList(),
      movies: Array.from({
        length: faker.datatype.number({ min: 1, max: 20 }),
      }).map(() => mockMovie()),
    },
  }));

  return {
    lists: {
      pageInfo: {
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      totalCount: movies.length,
      totalPages: 1,
      edges: movies,
    },
  };
}
