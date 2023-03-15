import type { GetStaticProps, NextPage } from 'next';

import { addApolloState, initializeApollo } from '../../../client';

import type {
  FindTrendingMoviesQuery,
  FindTrendingMoviesQueryVariables,
} from '@/graphql';

import { FindTrendingMoviesDocument } from '@/graphql';

import MoviesTrendingView from '../../../views/movies/trending';

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data: trendingMoviesData } = await apolloClient.query<
      FindTrendingMoviesQuery,
      FindTrendingMoviesQueryVariables
    >({
      query: FindTrendingMoviesDocument,
      variables: { page: 1 },
    });

    return addApolloState(apolloClient, {
      props: {
        ...trendingMoviesData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

const MoviesTrendingPage: NextPage = () => <MoviesTrendingView />;

export default MoviesTrendingPage;
