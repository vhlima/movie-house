import { List } from '../../domain/entities';

import { FindList } from '../../domain/usecases';

import { NotFoundError } from '../../domain/errors';

import { IListRepository } from '../contracts';

export class FindListService implements FindList {
  constructor(private readonly listRepository: IListRepository) {}

  async handle(listId: string): Promise<List> {
    const listExists = await this.listRepository.getListById(listId);

    if (!listExists) {
      throw new NotFoundError('ListNotFoundError', 'List not found.');
    }

    listExists.user = listExists.post.user;

    return listExists;
  }
}
