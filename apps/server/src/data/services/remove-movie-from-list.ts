import { User } from '../../domain/entities';

import { AuthenticationError, NotFoundError } from '../../domain/errors';

import { RemoveMovieFromList } from '../../domain/usecases';

import { IListRepository, IMovieReferenceRepository } from '../contracts';

export class RemoveMovieFromListService implements RemoveMovieFromList {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(
    listId: string,
    movieId: number,
    session?: User | undefined,
  ): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const listExists = await this.listRepository.getUserListById(
      session.id,
      listId,
    );

    if (!listExists) {
      throw new NotFoundError('ListNotFoundError', 'List not found.');
    }

    const isMovieAdded = await this.movieReferenceRepository.getMovieReference(
      listExists.id,
      movieId,
    );

    if (!isMovieAdded) {
      throw new NotFoundError(
        'MovieNotFoundError',
        'This movie not added to this list.',
      );
    }

    await this.movieReferenceRepository.deleteMovieReference(
      listExists.id,
      movieId,
    );

    return true;
  }
}
