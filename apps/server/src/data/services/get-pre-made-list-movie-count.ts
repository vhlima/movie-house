import { PreMadeListType } from '../../domain/entities';
import { GetPreMadeListMovieCount } from '../../domain/usecases';
import { MovieReferenceRepository } from '../../infra/repositories';
import { IPreMadeListRepository } from '../contracts';

export class GetPreMadeListMovieCountService
  implements GetPreMadeListMovieCount
{
  constructor(
    private readonly preMadeListRepository: IPreMadeListRepository,
    private readonly movieReferenceRepository: MovieReferenceRepository,
  ) {}

  async handle(
    userId: string,
    listType: PreMadeListType,
    start?: Date,
    end?: Date,
  ): Promise<number> {
    const listExists = await this.preMadeListRepository.getPreMadeListByType(
      userId,
      listType,
    );

    if (!listExists) {
      return 0;
    }

    const movieCount =
      await this.movieReferenceRepository.getMovieReferenceCount(
        listExists.id,
        start,
        end,
      );

    return movieCount;
  }
}
