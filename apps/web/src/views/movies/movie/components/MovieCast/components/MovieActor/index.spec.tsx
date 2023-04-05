import { RenderResult, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { MovieActor } from '.';

type SutType = {
  sut: RenderResult;
  originalName: string;
  character: string;
};

function createSut(): SutType {
  const originalName = faker.name.fullName();
  const character = faker.name.fullName();

  const sut = render(
    <MovieActor
      id={faker.datatype.number()}
      character={character}
      originalName={originalName}
    />,
  );

  return {
    sut,
    originalName,
    character,
  };
}

describe('MovieActor', () => {
  test('Should render originalName correctly', () => {
    const { sut, originalName } = createSut();

    const originalNameElement = sut.getByTestId('actor-original-name');
    expect(originalNameElement).toBeInTheDocument();
    expect(originalNameElement.textContent).toEqual(originalName);
  });

  test('Should render character name correctly', () => {
    const { sut, character } = createSut();

    const originalCharacterElement = sut.getByTestId('actor-character-name');
    expect(originalCharacterElement).toBeInTheDocument();
    expect(originalCharacterElement.textContent).toEqual(character);
  });
});
