import { MockedProvider } from '@apollo/client/testing';

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import type { FindListsQuery } from '@/gql';

import {
  mockList,
  mockSessionValue,
  mockedRouter,
  MockedRouterProvider,
} from '@/tests/data/mocks';

import ListPreview from '.';

type SutProps = {
  hasContent?: boolean;
  showUser?: boolean;
};

type SutType = {
  sut: RenderResult;
  mockedList: FindListsQuery['lists']['edges'][number]['node'];
};

function createSut(props?: SutProps): SutType {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const mockedList = mockList();

  const { hasContent = true, showUser = true } = props || {};

  const sut = render(
    <MockedProvider>
      <MockedRouterProvider>
        <ListPreview
          list={
            hasContent
              ? mockedList
              : { ...mockedList, post: { id: mockedList.post.id } }
          }
          showUser={showUser}
        />
      </MockedRouterProvider>
    </MockedProvider>,
  );

  return {
    sut,
    mockedList,
  };
}

describe('ListPreview', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should display PostReactions', () => {
    const { sut } = createSut();

    const postReactionsElement = sut.getByTestId('post-reactions');
    expect(postReactionsElement).toBeInTheDocument();
  });

  test('Should display UserIdentity if showUser is true', () => {
    const { sut } = createSut();

    const userDetailsElement = sut.getByTestId('user-identity');
    expect(userDetailsElement).toBeInTheDocument();
  });
  test('Should not display ListUserDetails if showUser is false', () => {
    const { sut } = createSut({ showUser: false });

    const userDetailsElement = sut.queryByTestId('user-identity');
    expect(userDetailsElement).not.toBeInTheDocument();
  });
  test('Should navigate to the correct URL when clicking list name', () => {
    const { sut, mockedList } = createSut();

    const listLinkElement = sut.getByTestId('list-link');
    fireEvent.click(listLinkElement);

    expect(mockedRouter.asPath).toEqual(`/lists/${mockedList.id}`);
  });
});
