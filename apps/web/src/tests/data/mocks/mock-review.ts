import type { FindReviewsQuery } from '@/graphql';

import { faker } from '@faker-js/faker';

import { mockMovie } from './mock-movie';

import { mockUser } from './mock-user';

export function mockReview(): FindReviewsQuery['reviews']['edges'][number]['node'] {
  return {
    id: faker.datatype.uuid(),
    movie: mockMovie(),
    post: {
      id: faker.datatype.uuid(),
      content: faker.lorem.lines(2),
      createdAt: faker.date.past().getTime(),
    },
    user: mockUser(),
  };
}
