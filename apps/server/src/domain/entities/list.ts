import { Post } from './post';

export enum ListSortType {
  NAME = 'NAME',
  OLDER = 'OLDER',
  POPULARITY = 'POPULARITY',
  UPDATED = 'UPDATED',
}

export class List {
  id: string;

  name: string;

  postId: string;

  post: Post;

  backgroundImageUrl?: string;

  isPrivate?: boolean;
}
