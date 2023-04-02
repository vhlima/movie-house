import { faker } from '@faker-js/faker';

import { fireEvent, render, RenderResult } from '@testing-library/react';

import { mockedRouter, MockedRouterProvider } from '@/tests/data/mocks';

import UserProfileLink from '.';

type SutType = {
  sut: RenderResult;
  username: string;
};

function createSut(): SutType {
  const username = faker.internet.userName();

  const sut = render(
    <MockedRouterProvider>
      <UserProfileLink username={username} />
    </MockedRouterProvider>,
  );

  return {
    sut,
    username,
  };
}

describe('UserProfileLink', () => {
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should navigate to correct URL on clicking user profile link', () => {
    const { sut, username } = createSut();

    const profileLinkElement = sut.getByTestId('user-profile-link');
    fireEvent.click(profileLinkElement);

    expect(mockedRouter.asPath).toEqual(`/users/${username}`);
  });
});
