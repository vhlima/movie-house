import { registerEnumType } from 'type-graphql';

enum UserListType {
  /* Movies watched by user */
  WATCHED = 'WATCHED',
  /* Movies in user's watchlist */
  WATCHLIST = 'WATCHLIST',
  /* Movies marked to watch later */
  WATCH_LATER = 'WATCH_LATER',
}

registerEnumType(UserListType, {
  name: 'UserListType',
  description: 'User list type defines wich category is that list in',
});

export default UserListType;
