import { Reply, PaginationPreResponse, PaginationInput } from '../entities';

export enum ReplySortType {
  POPULAR = 'POPULAR',
  CREATE_DATE_ASC = 'CREATE_DATE_ASC',
}

export interface FindReplies {
  handle: (
    commentaryId: string,
    props: PaginationInput<ReplySortType>,
  ) => Promise<PaginationPreResponse<Reply>>;
}
