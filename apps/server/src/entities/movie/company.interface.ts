import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

/* eslint-disable camelcase */

@ObjectType()
export default class Company {
  @Field()
  @Column()
  readonly id: string;

  @Field()
  @Column()
  readonly name: string;

  @Field({ name: 'logoPath', nullable: true })
  @Column({ nullable: true })
  readonly logo_path?: string;

  @Field({ name: 'originCountry' })
  @Column()
  readonly origin_country: string;
}
