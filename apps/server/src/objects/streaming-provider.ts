import { Field, Int, ObjectType } from 'type-graphql';

/* eslint-disable camelcase */
@ObjectType()
export default class StreamingProvider {
  @Field(() => Int, { name: 'id' })
  provider_id: number;

  @Field({ name: 'name' })
  provider_name: string;

  @Field(() => Int, { name: 'displayPriority' })
  display_priority: number;

  @Field({ name: 'logoUrl' })
  logo_path: string;
}
