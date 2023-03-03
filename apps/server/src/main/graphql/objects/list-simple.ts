import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ListSimple {
  @Field()
  postId: string;

  @Field()
  name: string;
}
