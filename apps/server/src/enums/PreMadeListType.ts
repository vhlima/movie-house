import { registerEnumType } from 'type-graphql';

enum PreMadeListType {
  /* Movies watched by user */
  WATCHED = 'WATCHED',
  /* Movies tagged as favorite */
  FAVORITE = 'FAVORITE',
  /* Movies in user's watchlist */
  WATCHLIST = 'WATCHLIST',
  /* Movies marked to watch later */
  WATCH_LATER = 'WATCH_LATER',
}

registerEnumType(PreMadeListType, {
  name: 'PreMadeListType',
  description: 'Used to distinguish lists',
});

export default PreMadeListType;
