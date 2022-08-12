import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ResolverInterface,
  FieldResolver,
  Root,
  Int,
  ID,
  Args,
  Ctx,
} from 'type-graphql';

import { FindOptionsWhere, MoreThan } from 'typeorm';

import { CommentaryRepository, LikeRepository } from '../repositories';

import type { ServerContext } from '../types';

import PaginationArgs from '../entities/types/args/pagination.args';

import Commentary from '../entities/postgres/comment/commentary.interface';

import Commentaries from '../entities/pagination/entities/commentaries.interface';

import AuthenticationError from '../errors/Authentication';
import NotFoundError from '../errors/NotFound';

@Resolver(() => Commentary)
export default class CommentaryResolver
  implements ResolverInterface<Commentary>
{
  @FieldResolver(() => Int)
  async likeCount(@Root() commentary: Commentary) {
    const count = await LikeRepository.count({
      rootId: commentary.postId,
      referenceId: commentary.id,
    });

    return count;
  }

  @FieldResolver(() => Int)
  async replyCount(@Root() commentary: Commentary) {
    // const count = await ReplyModel.count({
    //   commentaryId: commentary.id,
    // });

    // return count;

    return 0;
  }

  async findCommentaries(
    postId: string,
    first: number,
    cursor?: Date | string,
  ): Promise<Commentary[]> {
    const whereParams = { postId } as FindOptionsWhere<Commentary>;

    if (cursor) {
      Object.assign(whereParams, {
        createdAt: MoreThan(
          typeof cursor === 'string' ? new Date(cursor) : cursor,
        ),
      } as FindOptionsWhere<Commentary>);
    }

    const commentaries = await CommentaryRepository.find({
      where: whereParams,
      take: first,
      skip: !cursor ? 0 : 1,
    });

    return commentaries;
  }

  @Query(() => Commentaries)
  async commentaries(
    @Arg('postId', () => ID) postId: string,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    const commentaries = await this.findCommentaries(postId, first, after);

    if (commentaries.length <= 0) {
      return { edges: [], pageInfo: { hasNextPage: false } };
    }

    const endCursor = commentaries[commentaries.length - 1].createdAt;

    const nextCommentaries = await this.findCommentaries(
      postId,
      first,
      endCursor,
    );

    return {
      edges: commentaries.map(commentary => ({
        cursor: commentary.createdAt.toISOString(),
        node: commentary,
      })),
      pageInfo: {
        endCursor: endCursor.toISOString(),
        hasNextPage: nextCommentaries.length >= first,
      },
    };
  }

  @Mutation(() => Commentary)
  async comment(
    @Ctx() { user }: ServerContext,
    @Arg('postId', () => ID) postId: string,
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
