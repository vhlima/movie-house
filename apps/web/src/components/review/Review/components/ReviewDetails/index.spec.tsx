import { RenderResult, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { ReviewDetails } from '.';

function createSut(): RenderResult {
  const sut = render(
    <ReviewDetails
      rating={faker.datatype.number({ min: 1, max: 5 })}
      createdAt={faker.date.past().getTime()}
    />,
  );

  return sut;
}

describe('ReviewDetails', () => {
  test('Should render without errors', () => {
    const sut = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
});
