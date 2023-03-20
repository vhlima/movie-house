import { List } from '../../domain/entities';

import { FindList } from '../../domain/usecases';

import { NotFoundError } from '../../domain/errors';

import { IListRepository, IMovieReferenceRepository } from '../contracts';

export class FindListService implements FindList {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(listId: string): Promise<List> {
    const listExists = await this.listRepository.getListById(listId);

    if (!listExists) {
      throw new NotFoundError('ListNotFoundError', 'List not found.');
    }

    listExists.user = listExists.post.user;

    const listMovieCount =
      await this.movieReferenceRepository.getMovieReferenceCount(listId);

    listExists.movieCount = listMovieCount;

    return listExists;
  }
}
