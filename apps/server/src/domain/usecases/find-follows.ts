import { Follow, Pagination, PaginationInput } from '../entities';

export interface FindFollows {
  handle(
    userId: string,
    props: PaginationInput,
    isFollowing?: boolean,
  ): Promise<Pagination<Follow>>;
}
