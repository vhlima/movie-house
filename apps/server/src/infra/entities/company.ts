import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import { Company } from '../../domain/entities';

@ObjectType()
export class CompanyEntity implements Company {
  @Field()
  @Column()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logoPath?: string;

  @Field()
  @Column()
  originCountry: string;
}
