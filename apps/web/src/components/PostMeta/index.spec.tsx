import { cleanup, render, RenderResult } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { mockSessionValue } from '@/tests/data/mocks';

import { MockedProvider } from '@apollo/client/testing';

import { PostMeta } from '.';

function createSut(content?: string): RenderResult {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const sut = render(
    <MockedProvider>
      <PostMeta
        id={faker.datatype.uuid()}
        content={content}
        commentaryCount={0}
      />
    </MockedProvider>,
  );

  return sut;
}
describe('PostMeta', () => {
  afterEach(cleanup);
  test('Should display post content correctly', () => {
    const content = faker.hacker.phrase();

    const sut = createSut(content);

    const postContentElement = sut.getByTestId('post-meta-content');
    expect(postContentElement).toBeInTheDocument();
    expect(postContentElement.textContent).toEqual(content);
  });
  test('Should not display post content if it is not provided', () => {
    const sut = createSut();

    const postReactionsElement = sut.queryByTestId('post-meta-content');
    expect(postReactionsElement).not.toBeInTheDocument();
  });
});
