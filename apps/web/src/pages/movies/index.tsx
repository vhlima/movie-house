import type { GetServerSideProps, NextPage } from 'next';

import * as Yup from 'yup';

import type {
  FindFullMovieQuery,
  FindFullMovieQueryVariables,
} from '../../graphql';

import { FindFullMovieDocument } from '../../graphql';

import { addApolloState, initializeApollo } from '../../client';

import MoviesRootPageView from '../../views/movies/root';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const apolloClient = initializeApollo();

    // const { data: movieData } = await apolloClient.query<
    //   FindFullMovieQuery,
    //   FindFullMovieQueryVariables
    // >({
    //   query: FindFullMovieDocument,
    //   variables: { movieId: id },
    // });

    // return addApolloState(apolloClient, {
    //   props: {
    //     ...movieData,
    //   },
    // });

    return { props: {} };
  } catch (err) {
    return { notFound: true };
  }
};

const MoviesPage: NextPage = () => <MoviesRootPageView />;

export default MoviesPage;
