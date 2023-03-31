import { MockedProvider } from '@apollo/client/testing';

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import type { FindListsQuery } from '@/graphql';

import { mockList, mockSessionValue, mockedRouter } from '@/tests/data/mocks';

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
      <MemoryRouterProvider>
        <ListPreview list={mockedList} showUser={showUser} />
      </MemoryRouterProvider>
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
  test('Should display correct list name and movie count', () => {
    const { sut, mockedList } = createSut();

    const listNameElement = sut.getByTestId('list-name');
    expect(listNameElement).toBeInTheDocument();
    expect(listNameElement.textContent).toEqual(mockedList.name);

    const movieCountElement = sut.getByTestId('movie-count');
    expect(movieCountElement).toBeInTheDocument();
    expect(movieCountElement.textContent).toEqual(
      String(mockedList.movieCount),
    );
  });
  test('Should display post content correctly if present', () => {
    const { sut, mockedList } = createSut();

    const postContentElement = sut.getByTestId('post-content');
    expect(postContentElement).toBeInTheDocument();
    expect(postContentElement.textContent).toEqual(mockedList.post.content);
  });
  test('Should display user name and profile picture if showUser is true', () => {
    const { sut, mockedList } = createSut();

    const userInfoElement = sut.getByTestId('list-user-info');
    expect(userInfoElement).toBeInTheDocument();

    const profilePictureElement = sut.getByTestId(
      'list-user-profile-picture',
    ) as HTMLAnchorElement;
    expect(profilePictureElement.closest('a')).toBeInTheDocument();

    const usernameElement = sut.getByTestId('list-user-username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement.textContent).toEqual(mockedList.user.username);
  });
  test('Should not display user infos if showUser is false', () => {
    const { sut } = createSut(false);

    const userInfoElement = sut.queryByTestId('list-user-info');
    expect(userInfoElement).not.toBeInTheDocument();
  });
  test('Should navigate to the correct URL when clicking on list', () => {
    const { sut, mockedList } = createSut();

    const listLinkElement = sut.getByTestId('list-link');
    fireEvent.click(listLinkElement);

    expect(mockedRouter.asPath).toEqual(`/lists/${mockedList.id}`);
  });
});
