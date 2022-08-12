import { Field, ID, ObjectType, Root } from 'type-graphql';

import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { UserRepository } from '../../repositories';

import User from '../postgres/user.interface';

import UserNotFoundError from '../../errors/UserNotFound';

@ObjectType()
@Entity('likes')
export default class Like {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  readonly id: ObjectID;

  @Column()
  userId: string;

  @Field(() => ID)
  @Column()
  rootId: string;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  referenceId?: string;

  @Field(() => User)
  async user(@Root('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
