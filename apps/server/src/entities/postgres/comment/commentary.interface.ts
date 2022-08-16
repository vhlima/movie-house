import { Field, Int, ObjectType, Root } from 'type-graphql';

import { Entity } from 'typeorm';
import { ReplyRepository } from '../../../repositories';

import BaseCommentary from './base.interface';

@ObjectType()
@Entity('commentaries')
export default class Commentary extends BaseCommentary {
  @Field(() => Int)
  async replyCount(@Root() commentary: Commentary) {
    const count = await ReplyRepository.countBy({
      commentaryId: commentary.id,
    });

    return count;
  }
}
