import { List, Movie, User } from './index';

export enum ListSortType {
  NAME = 'NAME',
  OLDER = 'OLDER',
  POPULARITY = 'POPULARITY',
  UPDATED = 'UPDATED',
}

export class ListPreview extends List {
  user: User;

  movies: Movie[];
}
