import { User } from '../../domain/entities';
import { AuthenticationError } from '../../domain/errors';
import { IsMovieOnPreMadeList } from '../../domain/usecases';

import {
  IMovieReferenceRepository,
  IPreMadeListRepository,
} from '../contracts';
import { PreMadeListType } from '../enums';

export class IsMovieOnPreMadeListService implements IsMovieOnPreMadeList {
  constructor(
    private readonly preMadeListRepository: IPreMadeListRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(
    listType: PreMadeListType,
    movieId: number,
    session?: User | null,
  ): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const preMadeList = await this.preMadeListRepository.getPreMadeListByType(
      session.id,
      listType,
    );

    if (!preMadeList) {
      return false;
    }

    const movieReference =
      await this.movieReferenceRepository.getMovieReference(
        preMadeList.id,
        movieId,
      );

    return !!movieReference;
  }
}
