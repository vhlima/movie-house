import { RenderResult, fireEvent, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import {
  MockedRouterProvider,
  mockMovie,
  mockedRouter,
} from '@/tests/data/mocks';

import { ReviewCoverItem } from '.';

type SutType = {
  sut: RenderResult;
  id: string;
};

function createSut(): SutType {
  const id = faker.datatype.uuid();

  const sut = render(
    <MockedRouterProvider>
      <ReviewCoverItem id={id} movie={mockMovie()} />{' '}
    </MockedRouterProvider>,
  );

  return {
    sut,
    id,
  };
}

describe('ReviewCoverItem', () => {
  test('Should navigate to correct URL when clicking review cover', () => {
    const { sut, id } = createSut();

    const reviewLinkElement = sut.getByTestId('review-link');
    expect(reviewLinkElement).toBeInTheDocument();

    fireEvent.click(reviewLinkElement);

    expect(mockedRouter.asPath).toEqual(`/reviews/${id}`);
  });
});
