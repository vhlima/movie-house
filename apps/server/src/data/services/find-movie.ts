import { Movie } from '../../domain/entities';

import { FindMovie } from '../../domain/usecases';

import { IMovieRepository } from '../contracts';

import { MovieDTO } from '../dto';

import { BaseError, MovieNotFoundError } from '../../domain/errors';

export class FindMovieService implements FindMovie {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async handle(movieId: number, withCredits?: boolean): Promise<Movie> {
    const movie = await this.movieRepository.getMovieById(movieId, withCredits);

    if (!movie) {
      throw new MovieNotFoundError();
    }

    if (withCredits && !movie.credits) {
      throw new BaseError(
        'MovieCreditsNotFound',
        'Movie credits not found.',
        404,
      );
    }

    const movieEntity = new MovieDTO().fromModel(movie);

    return movieEntity;
  }
}
