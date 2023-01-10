import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type {
  Movie,
  FindFullMovieQuery,
  FindFullMovieQueryVariables,
} from '../../graphql';

import { FindFullMovieDocument } from '../../graphql';

import { initializeApollo } from '../../client';

import MovieView from '../../views/movies/root';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { movie: null, credits: null } };

  const { id } = params;

  if (!id && typeof id !== 'string') return defaultProps;

  const movieId = parseInt(id as string, 10);

  if (typeof movieId !== 'number') return defaultProps;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<
    FindFullMovieQuery,
    FindFullMovieQueryVariables
  >({
    query: FindFullMovieDocument,
    variables: { movieId },
  });

  // TODO if dont find movie return 404

  return {
    props: {
      movie: data.movie,
    },
  };

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const MoviePage: NextPage<FindFullMovieQuery> = ({ movie }) => (
  <MovieView movie={movie as Movie} />
);

export default MoviePage;
