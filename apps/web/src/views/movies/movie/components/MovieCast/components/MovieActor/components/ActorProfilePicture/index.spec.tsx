import { RenderResult, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { ActorProfilePicture } from '.';

type SutType = {
  sut: RenderResult;
};

function createSut(profilePictureUrl?: string): SutType {
  const sut = render(
    <ActorProfilePicture
      profilePictureUrl={profilePictureUrl}
      alt={faker.hacker.phrase()}
    />,
  );

  return {
    sut,
  };
}

describe('ActorProfilePicture', () => {
  test('Should render only empty profile picture', () => {
    const { sut } = createSut();

    const emptyProfilePictureElement = sut.getByTestId(
      'actor-profile-picture-empty',
    );
    expect(emptyProfilePictureElement).toBeInTheDocument();

    const profilePictureElement = sut.queryByTestId('actor-profile-picture');
    expect(profilePictureElement).not.toBeInTheDocument();
  });
});
