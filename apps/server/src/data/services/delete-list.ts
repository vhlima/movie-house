import { User } from '../../domain/entities';

import { DeleteList } from '../../domain/usecases';

import { AuthenticationError, NotFoundError } from '../../domain/errors';

import { IListRepository, IPostRepository } from '../contracts';

export class DeleteListService implements DeleteList {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly postRepository: IPostRepository,
  ) {}

  async handle(
    listId: string,
    session?: User | null | undefined,
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

    const postDeleteResponse = await this.postRepository.deletePost(
      listExists.postId,
    );

    if (!postDeleteResponse) {
      return false;
    }

    return true;
  }
}
