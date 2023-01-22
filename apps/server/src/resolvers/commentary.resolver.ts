import { Resolver, Query, Mutation, Arg, Args, Ctx, Int } from 'type-graphql';

import { ObjectId } from 'mongodb';

import { CommentaryRepository } from '../repositories';

import type { ServerContext } from '../types';

import { findWithPagination } from './pagination.resolver';

import PaginationArgs from '../entities/types/args/pagination.args';

import Commentary from '../entities/pg-entities/comment/commentary.interface';
import Commentaries from '../entities/pg-entities/pagination/entities/commentaries.interface';

import NotFoundError from '../errors/NotFound';
import AuthorizationError from '../errors/Authorization';
import AuthenticationError from '../errors/Authentication';

@Resolver(() => Commentary)
export default class CommentaryResolver {
  @Query(() => Commentaries)
  async commentaries(
    @Arg('postId', () => Int) postId: number,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    if (!ObjectId.isValid(postId)) {
      throw new NotFoundError('Post not found');
    }

    // const postExists = await ReviewRepository.findOneBy({
    //   _id: new ObjectId(postId),
    // });

    // if (!postExists) {
    //   throw new NotFoundError('Post not found');
    // }

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
    @Arg('postId', () => Int) postId: number,
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
  async deleteCommentary(
    @Ctx() { user }: ServerContext,
    @Arg('commentaryId') commentaryId: string,
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

    if (commentaryExists.userId !== user.id) {
      throw new AuthorizationError();
    }

    await CommentaryRepository.delete({ id: commentaryExists.id });

    return 'Deleted with sucess';
  }
}
