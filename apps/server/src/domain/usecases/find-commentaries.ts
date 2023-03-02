import {
  Commentary,
  PaginationPreResponse,
  PaginationInput,
} from '../entities';

export enum CommentarySortType {
  POPULAR = 'POPULAR',
  CREATE_DATE_ASC = 'CREATE_DATE_ASC',
}

export interface FindCommentaries {
  handle: (
    postId: string,
    props: PaginationInput<CommentarySortType>,
  ) => Promise<PaginationPreResponse<Commentary>>;
}
