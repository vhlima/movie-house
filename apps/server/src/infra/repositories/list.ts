import { IListRepository } from '../../data/contracts';

import { PostgresDataSource } from '../data-sources';

import { List } from '../../domain/entities';

import { ListEntity } from '../entities';

export class ListRepository implements IListRepository {
  private getListRepository() {
    return PostgresDataSource.getRepository(ListEntity);
  }

  async getUserLists(userId: string): Promise<List[]> {
    const listRepository = this.getListRepository();

    const userLists = await listRepository.find({
      where: {
        post: {
          userId,
        },
      },
      relations: ['post'],
    });

    return userLists;
  }

  async getUserListCount(userId: string): Promise<number> {
    const listRepository = this.getListRepository();

    const listCount = await listRepository.count({
      where: {
        post: {
          userId,
        },
      },
      relations: ['post'],
    });

    return listCount;
  }

  async getListById(listId: string): Promise<List | null> {
    const listRepository = this.getListRepository();

    const listResponse = await listRepository.findOne({
      where: {
        id: listId,
      },
      relations: ['post'],
    });

    return listResponse;
  }

  // TODO change that to maybe getListByPostId and receive only post id
  async getUserListByName(userId: string, name: string): Promise<List | null> {
    const listRepository = this.getListRepository();

    const listResponse = await listRepository.findOne({
      where: {
        name,
        post: {
          userId,
        },
      },
      relations: ['post'],
    });

    return listResponse;
  }

  async getUserListById(userId: string, listId: string): Promise<List | null> {
    const listRepository = this.getListRepository();

    const listResponse = await listRepository.findOne({
      where: {
        id: listId,
        post: {
          userId,
        },
      },
      relations: ['post'],
    });

    return listResponse;
  }

  async createList(postId: string, name: string): Promise<List> {
    const listRepository = this.getListRepository();

    const list = listRepository.create({
      postId,
      name,
    });

    await listRepository.save(list);

    return list;
  }

  async deleteList(listId: string): Promise<boolean> {
    const listRepository = this.getListRepository();

    await listRepository.delete({ id: listId });

    return true;
  }
}
