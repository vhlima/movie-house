import { Resolver, Query, Mutation, Arg, ID, Args, Ctx } from 'type-graphql';

import { ObjectId } from 'mongodb';

import { CommentaryRepository, ReviewRepository } from '../repositories';

import type { ServerContext } from '../types';

import { findWithPagination } from './pagination.resolver';

import PaginationArgs from '../entities/types/args/pagination.args';

import Commentary from '../entities/pg-entities/comment/commentary.interface';

import Commentaries from '../entities/pg-entities/pagination/entities/commentaries.interface';

import NotFoundError from '../errors/NotFound';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => Commentary)
export default class CommentaryResolver {
  @Query(() => Commentaries)
  async commentaries(
    @Arg('postId') postId: string,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    if (!ObjectId.isValid(postId)) {
      throw new NotFoundError('Post not found');
    }

    const postExists = await ReviewRepository.findOneBy({
      _id: new ObjectId(postId),
    });

    if (!postExists) {
      throw new NotFoundError('Post not found');
    }

    const commentaries = await findWithPagination<Commentary>({
      first,
      cursor: after,
      repository: CommentaryRepository,
      findOptions: { where: { postId }, relations: ['user'] },
    });

    return commentaries;
  }

  @Mutation(() => Commentary)
  async comment(
    @Ctx() { user }: ServerContext,
    @Arg('postId') postId: string,
    @Arg('body') body: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    // TODO check if postId exists

    const commentary = CommentaryRepository.create({
      userId: user.id,
      postId,
      body,
    });

    await CommentaryRepository.save(commentary);

    // TODO find way to fix that

    commentary.user = user;

    return commentary;
  }

  @Mutation(() => String)
  async deleteCommentary(@Arg('commentaryId') commentaryId: string) {
    const commentaryExists = await CommentaryRepository.findOneBy({
      id: commentaryId,
    });

    if (!commentaryExists) {
      throw new NotFoundError('Commentary not found');
    }

    await CommentaryRepository.delete({ id: commentaryExists.id });

    return 'Deleted with sucess';
  }
}
