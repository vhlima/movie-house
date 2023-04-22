import { Field, ObjectType } from 'type-graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { LikeType } from '../../main/graphql/enums';

@ObjectType('Like')
@Entity({ database: 'user_likes' })
export class LikeEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Field()
  @Column({ name: 'content_id' })
  contentId: string;

  @Field(() => LikeType)
  @Column({ type: 'enum', enum: LikeType })
  likeType: LikeType;
}
