import { Field, ID, Int, ObjectType, Root } from 'type-graphql';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { LikeRepository, ReplyRepository } from '../../../repositories';

import Like from '../../mongo-entities/like.interface';

import BaseCommentary from './base.interface';

import Post from '../post';

@ObjectType()
@Entity('commentaries')
export default class Commentary extends BaseCommentary {
  @Field(() => Int)
  @Column({ name: 'post_id' })
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post)
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'PostId',
  })
  post: Post;

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
