import { registerEnumType } from 'type-graphql';

enum ReviewSortType {
  YEAR = 'YEAR',
  CREATE_DATE_ASC = 'CREATE_DATE_ASC',
  CREATE_DATE_DESC = 'CREATE_DATE_DESC',
}

registerEnumType(ReviewSortType, {
  name: 'ReviewSortType',
  description: 'Sort options for review',
});

export default ReviewSortType;
