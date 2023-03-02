import { List, User } from '../../domain/entities';

import { CreateList } from '../../domain/usecases';

import { IListRepository, IPostRepository } from '../contracts';

import { AlreadyExistsError, AuthenticationError } from '../../domain/errors';

export class CreateListService implements CreateList {
  constructor(
    private readonly listRepository: IListRepository,
    private readonly postRepository: IPostRepository,
  ) {}

  async handle(
    name: string,
    content?: string,
    session?: User | null,
  ): Promise<List> {
    if (!session) {
      throw new AuthenticationError();
    }

    const listFound = await this.listRepository.getUserListByName(
      session.id,
      name,
    );

    if (listFound) {
      throw new AlreadyExistsError('You already have a list with this name.');
    }

    const post = await this.postRepository.createPost(session.id, content);

    const list = await this.listRepository.createList(post.id, name);

    return list;
  }
}
