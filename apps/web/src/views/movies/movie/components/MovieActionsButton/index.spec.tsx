import { RenderResult, fireEvent, render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { MockedProvider } from '@apollo/client/testing';
import { MovieActionsButton } from '.';

function createSut(): RenderResult {
  const sut = render(
    <MockedProvider>
      <MovieActionsButton
        id={faker.datatype.number()}
        originalTitle={faker.music.songName()}
      />
    </MockedProvider>,
  );

  return sut;
}

describe('MovieOptionsButton', () => {
  test('Should open MovieActionsModal when clicking button', async () => {
    const sut = createSut();

    const actionsButtonElement = sut.getByTestId('movie-actions-button');
    fireEvent.click(actionsButtonElement);

    const actionsModalElement = sut.getByTestId('movie-actions-modal');
    expect(actionsModalElement).toBeInTheDocument();
  });
});
