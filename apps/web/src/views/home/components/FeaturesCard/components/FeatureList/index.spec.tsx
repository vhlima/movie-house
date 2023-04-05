import { RenderResult, cleanup, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import type { Feature } from '../../types';

import { FeatureList } from '.';

function createSut(featuresAmount: number): RenderResult {
  const features: Feature[] = Array.from({ length: featuresAmount }).map(
    () => ({
      iconType: 'AiOutlineEye',
      link: {
        href: faker.internet.url(),
      },
      text: faker.hacker.phrase(),
    }),
  );

  const sut = render(<FeatureList features={features} />);

  return sut;
}

describe('FeatureList', () => {
  afterEach(cleanup);
  test('Should render a list of Feature', () => {
    const featuresAmount = faker.datatype.number({ min: 1, max: 10 });

    const sut = createSut(featuresAmount);

    const featureListElement = sut.getByTestId('feature-list');
    expect(featureListElement).toBeInTheDocument();
    expect(featureListElement.childElementCount).toEqual(featuresAmount);
  });
});
