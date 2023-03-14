import { MovieModel, MovieReferenceModel } from '../models';

export interface IMovieReferenceRepository {
  getMovieReference(
    referenceId: string,
    movieId?: number,
  ): Promise<MovieReferenceModel | null>;
  getMovieReferenceCount(
    referenceId: string,
    start?: Date,
    end?: Date,
  ): Promise<number>;
  createMovieReference(
    referenceId: string,
    movie: MovieModel,
  ): Promise<MovieReferenceModel>;
  deleteMovieReference(
    referenceId: string | [],
    movieId?: number,
  ): Promise<boolean>;
}
