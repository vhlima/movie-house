import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  FindMovieWithCreditsQuery,
  FindMovieWithCreditsQueryVariables,
} from '../../graphql';

import { FindMovieWithCreditsDocument } from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import MoviesRootPageView from '../../views/movies/root';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const apolloClient = initializeApollo();

    const { data: movieData } = await apolloClient.query<
      FindMovieWithCreditsQuery,
      FindMovieWithCreditsQueryVariables
    >({
      query: FindMovieWithCreditsDocument,
      variables: { movieId: parseInt(query.id as string, 10) },
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
