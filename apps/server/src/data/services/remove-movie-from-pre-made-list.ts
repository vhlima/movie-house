import { PreMadeListType, User } from '../../domain/entities';

import { AuthenticationError } from '../../domain/errors';

import { RemoveMovieFromPreMadeList } from '../../domain/usecases';

import {
  IMovieReferenceRepository,
  IPreMadeListRepository,
} from '../contracts';

export class RemoveMovieFromPreMadeListService
  implements RemoveMovieFromPreMadeList
{
  constructor(
    private readonly preMadeListRepository: IPreMadeListRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | null | undefined,
  ): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const listExists = await this.preMadeListRepository.getPreMadeListByType(
      session.id,
      listType,
    );

    if (!listExists) {
      return false;
    }

    const movieReferenceExists =
      await this.movieReferenceRepository.getMovieReference(
        listExists.id,
        movieId,
      );

    if (!movieReferenceExists) {
      return false;
    }

    await this.movieReferenceRepository.deleteMovieReference(
      listExists.id,
      movieId,
    );

    return true;
  }
}
