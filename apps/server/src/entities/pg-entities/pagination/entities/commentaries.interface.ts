import { ObjectType } from 'type-graphql';

import Pagination from '..';

import Commentary from '../../comment/commentary.interface';

@ObjectType()
export default class Commentaries extends Pagination<Commentary>(
  Commentary,
  'Commentaries',
) {}
