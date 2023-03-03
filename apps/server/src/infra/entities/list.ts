import { Field, ObjectType } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { List } from '../../domain/entities';

import { PostEntity } from './post';
import { Timestamps } from './timestamps';

@ObjectType('List')
@Entity('lists')
export class ListEntity extends Timestamps implements List {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'post_id' })
  postId: string;

  @Field(() => PostEntity)
  @OneToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'PostId',
  })
  post: PostEntity;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'background_image_url', nullable: true })
  backgroundImageUrl?: string;

  @Field({ nullable: true, defaultValue: false })
  @Column({ name: 'is_private', nullable: true, default: false })
  isPrivate?: boolean;
}
