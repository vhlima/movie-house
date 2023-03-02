import { Timestamps } from './timestamps';

export enum PreMadeListType {
  WATCHED = 'WATCHED',
  FAVORITE = 'FAVORITE',
  WATCHLIST = 'WATCHLIST',
  WATCH_LATER = 'WATCH_LATER',
}

export class PreMadeList extends Timestamps {
  id: string;

  userId: string;

  listType: PreMadeListType;
}
