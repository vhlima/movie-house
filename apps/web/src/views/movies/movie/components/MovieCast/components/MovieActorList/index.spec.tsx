import { RenderResult, cleanup, render } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';

import { faker } from '@faker-js/faker';

import type { FindMovieWithCreditsQuery } from '@/gql';

import { mockActors } from '@/tests/data/mocks';

import { MovieActorList } from '.';

type SutType = {
  sut: RenderResult;
  actors: FindMovieWithCreditsQuery['movieWithCredits']['credits']['cast'][number][];
};

function createSut(actorsAmount = 0): SutType {
  const actors = mockActors(actorsAmount);

  const sut = render(
    <MockedProvider>
      <MovieActorList actors={actors} />
    </MockedProvider>,
  );

  return {
    sut,
    actors,
  };
}

describe('MovieActorList', () => {
  afterEach(cleanup);
  test('Should display empty list message if actors is empty', () => {
    const { sut } = createSut();

    const emptyMessageElement = sut.getByTestId('empty-list-message');
    expect(emptyMessageElement).toBeInTheDocument();
  });
  test('Should render a list of actors', () => {
    const { sut, actors } = createSut(
      faker.datatype.number({ min: 1, max: 10 }),
    );

    const actorListElement = sut.getByTestId('actor-list');
    expect(actorListElement).toBeInTheDocument();
    expect(actorListElement.childElementCount).toEqual(actors.length);
  });
});
