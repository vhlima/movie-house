import { ObjectType } from 'type-graphql';

import Pagination from '..';

import Reply from '../../postgres/comment/reply.interface';

@ObjectType()
export default class Replies extends Pagination<Reply>(Reply, 'Replies') {}
