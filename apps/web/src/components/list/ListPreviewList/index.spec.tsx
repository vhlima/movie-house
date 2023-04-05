import { cleanup, render, RenderResult } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';

import { faker } from '@faker-js/faker';

import { mockLists, mockSessionValue } from '@/tests/data/mocks';

import { ListPreviewList } from '.';

function createSut(listAmount: number): RenderResult {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const lists = mockLists(listAmount).lists.edges.map(edge => edge.node);

  const sut = render(
    <MockedProvider>
      <ListPreviewList lists={lists} />
    </MockedProvider>,
  );

  return sut;
}

describe('ListPreviewList', () => {
  afterEach(cleanup);
  test('Should render a list of ListPreview when data is present', () => {
    const listAmount = faker.datatype.number({ min: 1, max: 10 });

    const sut = createSut(listAmount);

    const previewsList = sut.getByTestId('list-preview-list');

    expect(previewsList).toBeInTheDocument();
    expect(previewsList.childElementCount).toBe(listAmount);
  });
  test('Should show text for empty list when lists is empty', () => {
    const sut = createSut(0);

    const emptyTextElement = sut.getByTestId('empty-list-message');
    expect(emptyTextElement).toBeInTheDocument();
  });
});
