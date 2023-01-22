import { Resolver, Query, Mutation, Arg, Ctx, Args } from 'type-graphql';

import type { ServerContext } from '../types';

import { CommentaryRepository, ReplyRepository } from '../repositories';

import { findWithPagination } from './pagination.resolver';

import PaginationArgs from '../entities/types/args/pagination.args';

import Reply from '../entities/pg-entities/comment/reply.interface';

import Replies from '../entities/pg-entities/pagination/entities/replies.interface';

import NotFoundError from '../errors/NotFound';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => Reply)
export default class ReplyResolver {
  @Query(() => Replies)
  async replies(
    @Arg('commentaryId') commentaryId: string,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    const commentaryExists = await CommentaryRepository.findOneBy({
      id: commentaryId,
    });

    if (!commentaryExists) {
      throw new NotFoundError('Commentary not found');
    }

    const replies = await findWithPagination<Reply>({
      first,
      cursor: after,
      repository: ReplyRepository,
      findOptions: {
        where: { commentaryId },
        relations: ['user', 'commentary'],
      },
    });

    return replies;
  }

  @Mutation(() => Reply)
  async reply(
    @Ctx() { user }: ServerContext,
    @Arg('commentaryId') commentaryId: string,
    @Arg('body') body: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const commentaryExists = await CommentaryRepository.findOneBy({
      id: commentaryId,
    });

    if (!commentaryExists) {
      throw new NotFoundError('Commentary not found');
    }

    const reply = ReplyRepository.create({
      userId: user.id,
      commentaryId,
      body,
    });

    await ReplyRepository.save(reply);

    // TODO find way of returning user without specifying, more detailed objects can be massive

    reply.user = user;
    reply.commentary = commentaryExists;

    return reply;
  }

  @Mutation(() => String)
  async deleteReply(
    @Ctx() { user }: ServerContext,
    @Arg('replyId') replyId: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const replyExists = await ReplyRepository.findOneBy({
      id: replyId,
    });

    if (!replyExists) {
      throw new NotFoundError('Reply not found');
    }

    await ReplyRepository.delete({ id: replyExists.id });

    return 'Deleted with sucess';
  }
}
