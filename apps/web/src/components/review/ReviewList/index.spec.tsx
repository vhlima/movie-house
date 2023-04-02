import { RenderResult, cleanup, render } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';

import { faker } from '@faker-js/faker';

import type { FindReviewsQuery } from '@/graphql';

import { mockReview, mockSessionValue } from '@/tests/data/mocks';

import { ReviewList } from '.';

type SutType = {
  sut: RenderResult;
  reviews: FindReviewsQuery['reviews']['edges'][number]['node'][];
  emptyMessage: string;
};

function createSut(reviewAmount = 0): SutType {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const emptyMessage = faker.hacker.phrase();

  const mockedReviews = Array.from({ length: reviewAmount }).map(() =>
    mockReview(),
  );

  const sut = render(
    <MockedProvider>
      <ReviewList reviews={mockedReviews} emptyMessage={emptyMessage} />
    </MockedProvider>,
  );

  return {
    sut,
    reviews: mockedReviews,
    emptyMessage,
  };
}

describe('ReviewList', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should display emptyMessage if reviews is empty', () => {
    const { sut } = createSut();

    const emptyMessageElement = sut.getByTestId('empty-message');
    expect(emptyMessageElement).toBeInTheDocument();
  });
  test('Should display emptyMessage correctly', () => {
    const { sut, emptyMessage } = createSut();

    const emptyMessageElement = sut.getByTestId('empty-message');
    expect(emptyMessageElement.textContent).toEqual(emptyMessage);
  });
  test('Should render reviews inside the list', () => {
    const { sut, reviews } = createSut(
      faker.datatype.number({ min: 1, max: 10 }),
    );

    const reviewListElement = sut.getByTestId('review-list');
    expect(reviewListElement).toBeInTheDocument();
    expect(reviewListElement.childElementCount).toEqual(reviews.length);
  });
});
