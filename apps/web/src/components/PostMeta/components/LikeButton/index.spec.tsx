import { RenderResult, cleanup, render } from '@testing-library/react';

import { mockSessionValue } from '@/tests/data/mocks';

import { MockedProvider } from '@apollo/client/testing';

import { LikeType } from '@/graphql';

import { LikeButton } from '.';

function createSut(): RenderResult {
  mockSessionValue({
    data: null,
    status: 'unauthenticated',
  });

  const sut = render(
    <MockedProvider>
      <LikeButton postId="" likeType={LikeType.Post} />
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
