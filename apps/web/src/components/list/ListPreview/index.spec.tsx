import { MockedProvider } from '@apollo/client/testing';

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import type { FindListsQuery } from '@/graphql';

import {
  mockList,
  mockSessionValue,
  mockedRouter,
  MockedRouterProvider,
} from '@/tests/data/mocks';

import ListPreview from '.';

type SutType = {
  sut: RenderResult;
  mockedList: FindListsQuery['lists']['edges'][number]['node'];
};

function createSut(showUser = true): SutType {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const mockedList = mockList();

  const sut = render(
    <MockedProvider>
      <MockedRouterProvider>
        <ListPreview list={mockedList} showUser={showUser} />
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
  test('Should display post content correctly', () => {
    const { sut, mockedList } = createSut();

    const postContentElement = sut.getByTestId('post-content');
    expect(postContentElement).toBeInTheDocument();
    expect(postContentElement.textContent).toEqual(mockedList.post.content);
  });
  test('Should display ListUserDetails if showUser is true', () => {
    const { sut, mockedList } = createSut();

    const userDetailsElement = sut.getByTestId('list-user-details');
    expect(userDetailsElement).toBeInTheDocument();

    const profilePictureElement = sut.getByTestId('list-user-profile-picture');
    expect(profilePictureElement.closest('img')).toBeInTheDocument();

    const usernameElement = sut.getByTestId('list-user-username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement.textContent).toEqual(mockedList.user.username);
  });
  test('Should not display ListUserDetails if showUser is false', () => {
    const { sut } = createSut(false);

    const userDetailsElement = sut.queryByTestId('list-user-details');
    expect(userDetailsElement).not.toBeInTheDocument();
  });
  test('Should navigate to the correct URL when clicking list name', () => {
    const { sut, mockedList } = createSut();

    const listLinkElement = sut.getByTestId('list-link');
    fireEvent.click(listLinkElement);

    expect(mockedRouter.asPath).toEqual(`/lists/${mockedList.id}`);
  });
});
