import type { GetStaticProps, NextPage } from 'next';

import type {
  FindTrendingMoviesQuery,
  FindTrendingMoviesQueryVariables,
} from '@/gql';

import { FindTrendingMoviesDocument } from '@/gql';
import { addApolloState, initializeApollo } from '../../../client';

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

type Props = FindTrendingMoviesQuery;

const MoviesTrendingPage: NextPage<Props> = ({ trendingMovies }) => (
  <MoviesTrendingView movies={trendingMovies} />
);

export default MoviesTrendingPage;
