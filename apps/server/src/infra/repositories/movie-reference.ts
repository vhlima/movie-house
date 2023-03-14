import { Any } from 'typeorm';

import { IMovieReferenceRepository } from '../../data/contracts';

import { MovieDTO } from '../../data/dto';

import { MovieModel } from '../../data/models';

import { MovieReference } from '../../domain/entities';

import { MongoDataSource } from '../data-sources';

import { MovieReferenceEntity } from '../entities/movie-reference';

export class MovieReferenceRepository implements IMovieReferenceRepository {
  private getMovieReferenceRepository() {
    return MongoDataSource.getMongoRepository(MovieReferenceEntity);
  }

  async getMovieReferenceCount(
    referenceId: string,
    start?: Date,
    end?: Date,
  ): Promise<number> {
    const movieReferenceRepository = this.getMovieReferenceRepository();

    const movieReferenceFound = await movieReferenceRepository.countBy(
      !start || !end
        ? {
            referenceId,
          }
        : {
            referenceId,
            created_at: {
              $gte: start,
              $lte: end,
            },
          },
    );

    return movieReferenceFound;
  }

  async getMovieReference(
    referenceId: string,
    movieId?: number,
  ): Promise<MovieReference | null> {
    const movieReferenceRepository = this.getMovieReferenceRepository();

    const movieReferenceFound = await movieReferenceRepository.findOneBy(
      movieId ? { referenceId, movieId } : { referenceId },
    );

    return movieReferenceFound;
  }

  async createMovieReference(
    referenceId: string,
    movieData: MovieModel,
  ): Promise<MovieReference> {
    const movieReferenceRepository = this.getMovieReferenceRepository();

    const movieDTO = new MovieDTO();

    const movie = movieReferenceRepository.create({
      referenceId,
      movieId: movieData.id,
      movie: movieDTO.fromModel(movieData),
    });

    await movieReferenceRepository.save(movie);

    return movie;
  }

  async deleteMovieReference(
    referenceId: string | [],
    movieId?: number,
  ): Promise<boolean> {
    const movieReferenceRepository = this.getMovieReferenceRepository();

    const deleteResponse = await movieReferenceRepository.deleteMany({
      referenceId:
        typeof referenceId === 'string' ? referenceId : Any(referenceId),
      movieId: movieId || null,
    });

    if (deleteResponse.deletedCount && deleteResponse.deletedCount > 0) {
      return true;
    }

    return false;
  }
}
