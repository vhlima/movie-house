import { List } from '../../domain/entities';
import { UserNotFoundError } from '../../domain/errors';
import { FindUserLists } from '../../domain/usecases';
import { IListRepository, IUserRepository } from '../contracts';

export class FindUserListsService implements FindUserLists {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly listRepository: IListRepository,
  ) {}

  async handle(userId: string): Promise<List[]> {
    const userExists = await this.userRepository.getUserById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const userLists = await this.listRepository.getUserLists(userId);

    return userLists;
  }
}
