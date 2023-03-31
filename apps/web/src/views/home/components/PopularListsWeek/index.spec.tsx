import { MockedProvider } from '@apollo/client/testing';

import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import type { FindListsQuery, FindListsQueryVariables } from '@/graphql';

import { ListSortType, FindListsDocument } from '@/graphql';

import {
  mockLists,
  mockApolloRequest,
  mockSessionValue,
} from '@/tests/data/mocks';

import { PopularListsWeek } from '.';

function createSut(listAmount: number): RenderResult {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const mockPopularLists = mockApolloRequest<
    FindListsQuery,
    FindListsQueryVariables
  >({
    request: {
      query: FindListsDocument,
      variables: { page: 1, sort: { type: ListSortType.Popularity } },
    },
    result: {
      data: mockLists(listAmount),
    },
  });

  const sut = render(
    <MockedProvider addTypename={false} mocks={[mockPopularLists]}>
      <PopularListsWeek />
    </MockedProvider>,
  );

  return sut;
}

describe('PopularListsWeek', () => {
  afterEach(cleanup);

  test('Should render a list of ListPreview when data is present', async () => {
    const listAmount = faker.datatype.number({ min: 1, max: 10 });

    const sut = createSut(listAmount);

    const previewsList = await waitFor(() =>
      sut.getByTestId('popularListsWeek'),
    );

    expect(previewsList).toBeInTheDocument();
    expect(previewsList.childElementCount).toBe(listAmount);
  });

  test('Should show text for empty list when PopularListsWeek is empty', () => {
    const sut = createSut(0);

    const emptyTextElement = sut.container.querySelector('h2');
    expect(emptyTextElement).toBeInTheDocument();
  });
});
