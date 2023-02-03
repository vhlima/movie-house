import { registerEnumType } from 'type-graphql';

enum MovieSortType {
  GENRE = 'GENRE',
  DECADE = 'DECADE',
  YEAR = 'YEAR',
  RELEASE_DATE_ASC = 'RELEASE_DATE_ASC',
  RELEASE_DATE_DESC = 'RELEASE_DATE_DESC',
}

registerEnumType(MovieSortType, {
  name: 'MovieSortType',
  description: 'Sort options for movie list',
});

export default MovieSortType;