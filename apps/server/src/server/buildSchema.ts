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
  StreamingProvider,
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
      StreamingProvider,
    ],
    emitSchemaFile: path.resolve(__dirname, '..', 'schema.graphql'),
  });

  return schema;
};
