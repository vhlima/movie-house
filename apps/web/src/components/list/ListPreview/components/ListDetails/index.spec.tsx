import { RenderResult, render } from '@testing-library/react';

import type { FindListsQuery } from '@/graphql';

import { mockList } from '@/tests/data/mocks';

import { ListDetails } from '.';

type SutType = {
  sut: RenderResult;
  mockedList: FindListsQuery['lists']['edges'][number]['node'];
};

function createSut(): SutType {
  const mockedList = mockList();

  const sut = render(
    <ListDetails
      id={mockedList.id}
      name={mockedList.name}
      movieCount={mockedList.movieCount}
    />,
  );

  return {
    sut,
    mockedList,
  };
}

describe('ListDetails', () => {
  test('Should display correct name', () => {
    const { sut, mockedList } = createSut();

    const listNameElement = sut.getByTestId('list-name');
    expect(listNameElement).toBeInTheDocument();
    expect(listNameElement.textContent).toEqual(mockedList.name);
  });
  test('Should display correct movieCount', () => {
    const { sut, mockedList } = createSut();

    const movieCountElement = sut.getByTestId('movie-count');
    expect(movieCountElement).toBeInTheDocument();
    expect(movieCountElement.textContent).toEqual(
      String(mockedList.movieCount),
    );
  });
});
