import { cleanup, render, RenderResult } from '@testing-library/react';

import { mockUser, MockedRouterProvider } from '@/tests/data/mocks';

import { ListUserDetails } from '.';

type SutProps = {
  username: string;
  profilePictureUrl?: string;
};

function createSut(props: SutProps): RenderResult {
  const sut = render(
    <MockedRouterProvider>
      <ListUserDetails
        username={props.username}
        profilePictureUrl={props.profilePictureUrl}
      />
    </MockedRouterProvider>,
  );

  return sut;
}

describe('ListUserDetails', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const sut = createSut(mockUser());
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should display username correctly', () => {
    const mockedUser = mockUser();

    const sut = createSut(mockedUser);

    const usernameElement = sut.getByTestId('list-user-username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement.textContent).toEqual(mockedUser.username);
  });
  test('Should display profile picture correctly', () => {
    const sut = createSut(mockUser());

    const profilePictureElement = sut.getByTestId('list-user-profile-picture');
    expect(profilePictureElement.closest('img')).toBeInTheDocument();
  });
});
