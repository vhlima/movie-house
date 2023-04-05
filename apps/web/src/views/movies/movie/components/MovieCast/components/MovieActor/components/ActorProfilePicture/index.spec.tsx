import { RenderResult, cleanup, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { ActorProfilePicture } from '.';

function createSut(profilePictureUrl?: string): RenderResult {
  const sut = render(
    <ActorProfilePicture
      profilePictureUrl={profilePictureUrl}
      alt={faker.hacker.phrase()}
    />,
  );

  return sut;
}

describe('ActorProfilePicture', () => {
  afterEach(cleanup);
  test('Should render only empty profile picture', () => {
    const sut = createSut();

    const emptyProfilePictureElement = sut.getByTestId(
      'actor-profile-picture-empty',
    );
    expect(emptyProfilePictureElement).toBeInTheDocument();

    const profilePictureElement = sut.queryByTestId('actor-profile-picture');
    expect(profilePictureElement).not.toBeInTheDocument();
  });
  test('Should render only profile picture', () => {
    const sut = createSut(faker.internet.avatar());

    const profilePictureElement = sut.getByTestId('actor-profile-picture');
    expect(profilePictureElement).toBeInTheDocument();

    const emptyProfilePictureElement = sut.queryByTestId(
      'actor-profile-picture-empty',
    );
    expect(emptyProfilePictureElement).not.toBeInTheDocument();
  });
});
