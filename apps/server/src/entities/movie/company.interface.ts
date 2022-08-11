import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

@ObjectType()
export default class Company {
  @Field()
  @Column()
  readonly id: string;

  @Field()
  @Column()
  readonly name: string;

  @Field({ nullable: true })
  @Column({ name: 'logo_path', nullable: true })
  readonly logoPath?: string;

  @Field()
  @Column({ name: 'origin_country' })
  readonly originCountry: string;
}
