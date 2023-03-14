import { MovieReference, User } from '../../domain/entities';

import { AuthenticationError, NotFoundError } from '../../domain/errors';

import {
  AddMovieToPreMadeList,
  CreateMovieReference,
} from '../../domain/usecases';

import { IPreMadeListRepository } from '../contracts';
import { PreMadeListType } from '../enums';

export class AddMovieToPreMadeListService implements AddMovieToPreMadeList {
  constructor(
    private readonly preMadeListRepository: IPreMadeListRepository,
    private readonly createMovieReferenceService: CreateMovieReference,
  ) {}

  async handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | undefined,
  ): Promise<MovieReference> {
    if (!session) {
      throw new AuthenticationError();
    }

    let list = await this.preMadeListRepository.getPreMadeListByType(
      session.id,
      listType,
    );

    if (!list) {
      list = await this.preMadeListRepository.createPreMadeList(
        session.id,
        listType,
      );
    }

    if (!list) {
      throw new NotFoundError('ListNotFoundError', 'PreMadeList not found.');
    }

    const movieReference = await this.createMovieReferenceService.handle(
      list.id,
      movieId,
    );

    return movieReference;
  }
}
