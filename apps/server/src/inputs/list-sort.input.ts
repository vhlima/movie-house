import { Field, InputType } from 'type-graphql';

import ListSortType from '../enums/ListSortType';

@InputType()
export default class ListSortInput {
  @Field(() => ListSortType)
  type: ListSortType;
}
