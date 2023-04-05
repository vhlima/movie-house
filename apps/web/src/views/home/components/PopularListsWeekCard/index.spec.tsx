import { RenderResult, fireEvent, render } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';

import { faker } from '@faker-js/faker';

import type { FindListsQuery, FindListsQueryVariables } from '@/graphql';

import { FindListsDocument, ListSortType } from '@/graphql';

import {
  MockedRouterProvider,
  mockApolloRequest,
  mockLists,
  mockedRouter,
} from '@/tests/data/mocks';

import { PopularListsWeekCard } from '.';

function createSut(): RenderResult {
  const mockedFindListsQuery = mockApolloRequest<
    FindListsQuery,
    FindListsQueryVariables
  >({
    request: {
      query: FindListsDocument,
      variables: {
        page: 1,
        sort: {
          type: ListSortType.Popularity,
        },
      },
    },
    result: {
      data: mockLists(faker.datatype.number({ min: 1, max: 10 })),
    },
  });

  const sut = render(
    <MockedProvider addTypename={false} mocks={[mockedFindListsQuery]}>
      <MockedRouterProvider>
        <PopularListsWeekCard />
      </MockedRouterProvider>
    </MockedProvider>,
  );

  return sut;
}

describe('PopularListsWeekCard', () => {
  test('Should navigate to correct URL when clicking card header', () => {
    const sut = createSut();

    const popularListsLink = sut.getByTestId('popular-lists-link');
    fireEvent.click(popularListsLink);

    expect(mockedRouter.asPath).toEqual('/lists/trending');
  });
});
