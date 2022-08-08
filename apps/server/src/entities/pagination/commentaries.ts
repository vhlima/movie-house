import { Field, ObjectType } from 'type-graphql';

import Pagination from '.';

import Commentary from '../commentary/commentary.interface';

@ObjectType()
export default abstract class CommentariesPaginated extends Pagination {
  @Field(() => [Commentary])
  commentaries: Commentary[];
}
