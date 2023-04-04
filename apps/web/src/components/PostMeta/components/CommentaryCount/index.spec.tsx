import { RenderResult, cleanup, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { CommentaryCount } from '.';

type SutType = {
  sut: RenderResult;
  commentaryCount: number;
};

function createSut(): SutType {
  const commentaryCount = faker.datatype.number({ min: 0 });

  const sut = render(<CommentaryCount commentaryCount={commentaryCount} />);

  return {
    sut,
    commentaryCount,
  };
}

describe('PostReactions', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should display the correct commentaryCount', () => {
    const { sut, commentaryCount } = createSut();

    const commentaryCountElement = sut.getByTestId('commentary-count');
    expect(commentaryCountElement.textContent).toEqual(String(commentaryCount));
  });
});
