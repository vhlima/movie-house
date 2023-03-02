import { FindMovieReference } from '../../domain/usecases';

import { IMovieReferenceRepository } from '../contracts';

import { MovieReference } from '../../domain/entities';

import { NotFoundError } from '../../domain/errors';

export class FindMovieReferenceService implements FindMovieReference {
  constructor(
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(referenceId: string): Promise<MovieReference | null> {
    const movieReferenceFound =
      this.movieReferenceRepository.getMovieReference(referenceId);

    if (!movieReferenceFound) {
      throw new NotFoundError(
        'MovieReferenceNotFoundError',
        'Movie reference not found.',
      );
    }

    return movieReferenceFound;
  }
}
