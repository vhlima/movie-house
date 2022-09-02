import { Field, ID, ObjectType, Root } from 'type-graphql';

import { Column, Entity } from 'typeorm';

import { LikeRepository } from '../../../repositories';

import Like from '../../mongo/like.interface';

import BaseCommentary from './base.interface';

@ObjectType()
@Entity('replies')
export default class Reply extends BaseCommentary {
  @Field(() => ID)
  @Column({ name: 'commentary_id' })
  commentaryId: string;

  @Field(() => [Like])
  async likes(@Root() reply: Reply) {
    const likes = await LikeRepository.findBy({
      rootId: reply.postId,
      referenceId: reply.id,
    });

    return likes;
  }
}
