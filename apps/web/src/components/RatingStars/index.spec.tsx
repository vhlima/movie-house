import { cleanup, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { RatingStars } from '.';

const MAX_STARS = 5;

function createSut(rating: number) {
  const sut = render(<RatingStars rating={rating} />);
  return sut;
}
function generateRating(max = MAX_STARS) {
  return faker.datatype.number({ min: 1, max });
}

describe('RatingStars', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const sut = createSut(generateRating());
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should render the right amount of full stars', () => {
    const rating = generateRating();

    const sut = createSut(rating);

    const ratingStarsElements = sut.getAllByTestId('star-icon-full');
    expect(ratingStarsElements.length).toEqual(rating);
  });
  test('Should render the right amount of outline stars', () => {
    const rating = generateRating(4);

    const sut = createSut(rating);

    const ratingStarsElements = sut.getAllByTestId('star-icon-outline');
    expect(ratingStarsElements.length).toEqual(MAX_STARS - rating);
  });
  test('Should render a half star', () => {
    const rating = generateRating(4) + 0.5;

    const sut = createSut(rating);

    const ratingStarsElement = sut.getByTestId('star-icon-half');
    expect(ratingStarsElement).toBeInTheDocument();
  });
});
