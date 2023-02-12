import { Field, InputType } from 'type-graphql';

import SortScalar from '../scalars/SortScalar';

@InputType()
export default abstract class SortInput {
  @Field(() => SortScalar, { nullable: true })
  filter?: string;
}
