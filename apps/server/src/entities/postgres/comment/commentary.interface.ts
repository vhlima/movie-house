import { Field, Int, ObjectType, Root } from 'type-graphql';

import { Entity } from 'typeorm';
import { LikeRepository, ReplyRepository } from '../../../repositories';
import Like from '../../mongo/like.interface';

import BaseCommentary from './base.interface';

@ObjectType()
@Entity('commentaries')
export default class Commentary extends BaseCommentary {
  @Field(() => [Like])
  async likes(@Root() commentary: Commentary) {
    const likes = await LikeRepository.findBy({
      rootId: commentary.postId,
      referenceId: commentary.id,
    });

    return likes;
  }

  @Field(() => Int)
  async replyCount(@Root() commentary: Commentary) {
    const count = await ReplyRepository.countBy({
      commentaryId: commentary.id,
    });

    return count;
  }
}
