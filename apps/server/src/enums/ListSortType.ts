import { registerEnumType } from 'type-graphql';

enum ListSortType {
  NAME = 'NAME',
  POPULARITY = 'POPULARITY',
  UPDATED = 'UPDATED',
  OLDER = 'OLDER',
}

registerEnumType(ListSortType, {
  name: 'ListSortType',
  description: 'Sort options for lists',
});

export default ListSortType;
