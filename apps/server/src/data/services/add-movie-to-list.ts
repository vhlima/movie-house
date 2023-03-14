import { MovieReference, User } from '../../domain/entities';

import { AuthenticationError, NotFoundError } from '../../domain/errors';

import { AddMovieToList, CreateMovieReference } from '../../domain/usecases';

import { IListRepository } from '../contracts';

export class AddMovieToListService implements AddMovieToList {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly createMovieReferenceService: CreateMovieReference,
  ) {}

  async handle(
    listId: string,
    movieId: number,
    session?: User | undefined,
  ): Promise<MovieReference> {
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

    const movieReference = await this.createMovieReferenceService.handle(
      listExists.id,
      movieId,
    );

    return movieReference;
  }
}
