import { Field, ID, ObjectType, Root } from 'type-graphql';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { LikeRepository } from '../../../repositories';

import Like from '../../mongo-entities/like.interface';

import BaseCommentary from './base.interface';
import Commentary from './commentary.interface';

@ObjectType()
@Entity('replies')
export default class Reply extends BaseCommentary {
  @Field(() => ID)
  @Column({ name: 'commentary_id' })
  commentaryId: string;

  @Field(() => Commentary)
  @ManyToOne(() => Commentary, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'commentary_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'CommentaryId',
  })
  commentary: Commentary;

  @Field(() => [Like])
  async likes(@Root() reply: Reply) {
    const likes = await LikeRepository.findBy({
      referenceId: reply.id,
    });

    return likes;
  }
}
