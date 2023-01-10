import type { GetStaticProps, NextPage } from 'next';

import { initializeApollo } from '../../../client';

import type {
  FindTrendingMoviesQuery,
  FindTrendingMoviesQueryVariables,
} from '../../../graphql';

import { FindTrendingMoviesDocument } from '../../../graphql';

import MoviesTrendingView from '../../../views/movies/trending';

export const getStaticProps: GetStaticProps = async () => {
  const defaultProps = { props: {} };

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<
    FindTrendingMoviesQuery,
    FindTrendingMoviesQueryVariables
  >({
    query: FindTrendingMoviesDocument,
    variables: { page: 1 },
  });

  return {
    props: { trendingMovies: data.trendingMovies },
  };

  return defaultProps;
};

const MoviesTrendingPage: NextPage<FindTrendingMoviesQuery> = result => (
  <MoviesTrendingView trendingMovies={result} />
);

export default MoviesTrendingPage;
