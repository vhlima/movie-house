import type { FindMovieWithCreditsQuery } from '@/gql';

import { faker } from '@faker-js/faker';

type Actor =
  FindMovieWithCreditsQuery['movieWithCredits']['credits']['cast'][number];

export function mockActor(): Actor {
  return {
    id: faker.datatype.number(),
    character: faker.name.fullName(),
    originalName: faker.name.fullName(),
    profilePictureUrl: faker.internet.avatar(),
  };
}

export function mockActors(amount: number): Actor[] {
  const actors = Array.from({ length: amount }).map(() => mockActor());

  return actors;
}
