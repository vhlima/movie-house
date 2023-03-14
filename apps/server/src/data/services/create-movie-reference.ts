import { MovieReference } from '../../domain/entities';

import { AlreadyExistsError, MovieNotFoundError } from '../../domain/errors';

import { CreateMovieReference } from '../../domain/usecases';

import { IMovieReferenceRepository, IMovieRepository } from '../contracts';

export class CreateMovieReferenceService implements CreateMovieReference {
  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(referenceId: string, movieId: number): Promise<MovieReference> {
    const movieExists = await this.movieRepository.getMovieById(movieId);

    if (!movieExists) {
      throw new MovieNotFoundError();
    }

    const referenceExists =
      await this.movieReferenceRepository.getMovieReference(
        referenceId,
        movieId,
      );

    if (referenceExists) {
      throw new AlreadyExistsError('This movie is already added to this list.');
    }

    const movieReference =
      await this.movieReferenceRepository.createMovieReference(
        referenceId,
        movieExists,
      );

    return movieReference;
  }
}
