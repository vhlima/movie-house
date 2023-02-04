import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const formatError = (error: GraphQLFormattedError) => {
  if (error instanceof GraphQLError) {
    return error;
  }

  if (error.path) {
    return error;
  }

  const now = Date.now();

  console.log(`Unexpected error occurred: ${now}`);
  console.error(error);

  return new GraphQLError(`Internal server error: ${now}`);
};
