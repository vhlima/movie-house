import { cleanup, render, RenderResult } from '@testing-library/react';

import { mockUser, MockedRouterProvider } from '@/tests/data/mocks';

import { ListUserDetails } from '.';

type SutType = {
  sut: RenderResult;
  mockedUser: {
    username: string;
    profilePictureUrl?: string;
  };
};

function createSut(): SutType {
  const mockedUser = mockUser();

  const sut = render(
    <MockedRouterProvider>
      <ListUserDetails
        username={mockedUser.username}
        profilePictureUrl={mockedUser.profilePictureUrl}
      />
    </MockedRouterProvider>,
  );

  return {
    sut,
    mockedUser,
  };
}

describe('ListUserDetails', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should display username correctly', () => {
    const { sut, mockedUser } = createSut();

    const usernameElement = sut.getByTestId('list-user-details-username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement.textContent).toEqual(mockedUser.username);
  });
  test('Should display ProfilePicture', () => {
    const { sut } = createSut();

    const profilePictureElement = sut.getByTestId('user-profile-picture');
    expect(profilePictureElement).toBeInTheDocument();
  });
});
