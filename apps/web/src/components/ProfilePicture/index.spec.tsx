import { RenderResult, cleanup, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { ProfilePicture } from '.';

type SutType = {
  sut: RenderResult;
  profilePictureUrl: string;
};

function createSut(): SutType {
  const profilePictureUrl = faker.internet.avatar();

  const sut = render(<ProfilePicture src={profilePictureUrl} imageSize="md" />);

  return {
    sut,
    profilePictureUrl,
  };
}

describe('ProfilePicture', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should display profile picture with correct URL', () => {
    const { sut, profilePictureUrl } = createSut();

    const profilePictureElement = sut.getByTestId(
      'user-profile-picture',
    ) as HTMLImageElement;
    expect(profilePictureElement.closest('img')).toBeInTheDocument();
    expect(profilePictureElement.src).toEqual(profilePictureUrl);
  });
});
