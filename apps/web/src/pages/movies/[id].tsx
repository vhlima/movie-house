import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type { MovieResponse } from '../../graphql/Movie/types';

import { FIND_FULL_MOVIE } from '../../graphql/Movie';

import MovieView from '../../views/movies/view';

import client from '../../api';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { movie: null, credits: null } };

  const { id } = params;

  if (!id && typeof id !== 'string') return defaultProps;

  const movieId = parseInt(id as string, 10);

  if (typeof movieId !== 'number') return defaultProps;

  try {
    const { data: movieData } = await client.query<MovieResponse>({
      query: FIND_FULL_MOVIE,
      variables: { movieId },
    });

    // TODO if dont find movie return 404

    return {
      props: {
        movie: movieData.movie,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return defaultProps;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const Movie: NextPage<MovieResponse> = ({ movie }) => (
  <MovieView movie={movie} />
);

export default Movie;
