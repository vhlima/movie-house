import { buildSchema as buildTypeGraphQLSchema } from 'type-graphql';

import path from 'path';

import {
  UserResolver,
  MovieResolver,
  ReviewResolver,
  ProfileResolver,
  FollowResolver,
  LikeResolver,
  CommentaryResolver,
  ReplyResolver,
  PreMadeListResolver,
  ListResolver,
  ListMovieResolver,
  PreMadeListMovieResolver,
  LimitResolver,
} from '../resolvers';

export const buildSchema = async () => {
  const schema = await buildTypeGraphQLSchema({
    resolvers: [
      UserResolver,
      MovieResolver,
      ReviewResolver,
      ProfileResolver,
      FollowResolver,
      LikeResolver,
      CommentaryResolver,
      ReplyResolver,
      PreMadeListResolver,
      ListResolver,
      ListMovieResolver,
      PreMadeListMovieResolver,
      LimitResolver,
    ],
    // resolvers: [path.resolve(__dirname, 'src/resolvers/*.ts')],
    emitSchemaFile: path.resolve(__dirname, '..', 'schema.graphql'),
  });

  return schema;
};
