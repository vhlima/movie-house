import { RenderResult, cleanup, render } from '@testing-library/react';

import { mockSessionValue } from '@/tests/data/mocks';

import { MockedProvider } from '@apollo/client/testing';

import { PostReactions } from '.';

function createSut(): RenderResult {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const sut = render(
    <MockedProvider>
      <PostReactions postId="" commentaryCount={0} />
    </MockedProvider>,
  );
  return sut;
}

describe('PostReactions', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const sut = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
});
