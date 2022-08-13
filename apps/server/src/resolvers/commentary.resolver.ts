import { Resolver, Query, Mutation, Arg, ID, Args, Ctx } from 'type-graphql';

import { ObjectId } from 'mongodb';

import { FindOptionsWhere, MoreThan } from 'typeorm';

import { CommentaryRepository, ReviewRepository } from '../repositories';

import type { ServerContext } from '../types';

import PaginationArgs from '../entities/types/args/pagination.args';

import Commentary from '../entities/postgres/comment/commentary.interface';

import Commentaries from '../entities/pagination/entities/commentaries.interface';

import AuthenticationError from '../errors/Authentication';
import NotFoundError from '../errors/NotFound';

@Resolver(() => Commentary)
export default class CommentaryResolver {
  async findCommentaries(
    postId: string,
    first: number,
    cursor?: Date | string,
  ): Promise<Commentary[]> {
    const whereParams = {
      postId,
    } as FindOptionsWhere<Commentary>;

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
      relations: ['user'],
      order: {
        createdAt: 'ASC',
      },
    });

    return commentaries;
  }

  @Query(() => Commentaries)
  async commentaries(
    @Arg('postId', () => ID) postIdString: string,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    if (!ObjectId.isValid(postIdString)) {
      throw new NotFoundError('Post not found');
    }

    const postId = new ObjectId(postIdString);

    const postExists = await ReviewRepository.findOneBy({
      _id: new ObjectId(postId),
    });

    if (!postExists) {
      throw new NotFoundError('Post not found');
    }

    const commentaries = await this.findCommentaries(
      postIdString,
      first,
      after,
    );

    if (commentaries.length <= 0) {
      return { edges: [], pageInfo: { hasNextPage: false } };
    }

    const endCursor = commentaries[commentaries.length - 1].createdAt;

    const nextCommentaries = await this.findCommentaries(
      postIdString,
      1,
      endCursor,
    );

    return {
      edges: commentaries.map(commentary => ({
        cursor: commentary.createdAt.toISOString(),
        node: commentary,
      })),
      pageInfo: {
        endCursor: endCursor.toISOString(),
        hasNextPage: nextCommentaries.length > 0,
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
