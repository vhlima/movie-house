import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ListSimple {
  @Field()
  id: string;

  @Field()
  name: string;
}
