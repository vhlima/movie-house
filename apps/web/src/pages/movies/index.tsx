import type { GetServerSideProps, NextPage } from 'next';

import type {
  DiscoverMoviesQuery,
  DiscoverMoviesQueryVariables,
} from '@/graphql';

import { DiscoverMoviesDocument } from '@/graphql';

import { addApolloState, initializeApollo } from '../../client';

import MoviesRootPageView from '../../views/movies/root';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = initializeApollo();

    const { data: movieData } = await apolloClient.query<
      DiscoverMoviesQuery,
      DiscoverMoviesQueryVariables
    >({
      query: DiscoverMoviesDocument,
      variables: { page: 1 },
    });

    return addApolloState(apolloClient, {
      props: {
        ...movieData,
      },
    });
  } catch (err) {
    return { notFound: true };
  }
};

const MoviesPage: NextPage = () => <MoviesRootPageView />;

export default MoviesPage;
