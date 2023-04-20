import { RenderResult, cleanup, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { formatDateDistanceFromMillis } from '@/utils/date-utils';

import { ListInfo } from '.';

type SutType = {
  sut: RenderResult;
  name: string;
  createdAt: number;
};

function createSut(): SutType {
  const name = faker.hacker.phrase();
  const createdAt = faker.date.past();

  const sut = render(<ListInfo name={name} createdAt={createdAt.getTime()} />);

  return {
    sut,
    name,
    createdAt: createdAt.getTime(),
  };
}

describe('ListInfo', () => {
  afterEach(cleanup);
  test('Should display name correctly', () => {
    const { sut, name } = createSut();

    const listNameElement = sut.getByTestId('list-name');
    expect(listNameElement).toBeInTheDocument();
    expect(listNameElement.textContent).toEqual(name);
  });
  test('Should display creation date correctly', () => {
    const { sut, createdAt } = createSut();

    const createdAtFormatted = formatDateDistanceFromMillis(createdAt);

    const creationDateElement = sut.getByTestId('list-creation-date');
    expect(creationDateElement).toBeInTheDocument();
    expect(creationDateElement.textContent).toEqual(createdAtFormatted);
  });
});
