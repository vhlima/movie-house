import { IPreMadeListRepository } from '../../data/contracts';

import { PostgresDataSource } from '../data-sources';

import { PreMadeList } from '../../domain/entities';

import { PreMadeListEntity } from '../entities';
import { PreMadeListType } from '../../data/enums';

export class PreMadeListRepository implements IPreMadeListRepository {
  private getPreMadeListRepository() {
    return PostgresDataSource.getRepository(PreMadeListEntity);
  }

  // async getUserPreMadeListById(
  //   userId: string,
  //   listId: string,
  // ): Promise<PreMadeList | null> {
  //   const preMadeListRepository = this.getPreMadeListRepository();

  //   const preMadeListResponse = await preMadeListRepository.findOne({
  //     where: {
  //       id: listId,
  //       userId,
  //     },
  //   });

  //   return preMadeListResponse;
  // }

  async getPreMadeListByType(
    userId: string,
    listType: PreMadeListType,
  ): Promise<PreMadeList | null> {
    const preMadeListRepository = this.getPreMadeListRepository();

    const preMadeListResponse = await preMadeListRepository.findOne({
      where: {
        userId,
        listType,
      },
    });

    return preMadeListResponse;
  }

  async createPreMadeList(
    userId: string,
    listType: PreMadeListType,
  ): Promise<PreMadeList> {
    const preMadeListRepository = this.getPreMadeListRepository();

    const preMadeList = preMadeListRepository.create({
      userId,
      listType,
    });

    await preMadeListRepository.save(preMadeList);

    return preMadeList;
  }
}
