import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type { MovieCreditsResponse, MovieResponse } from '../../types/movie';

import { GET_MOVIE, GET_MOVIE_CREDITS } from '../../graphql/movie';

import MovieView from '../../views/movies/view';

import client from '../../api';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { movie: null, credits: null } };

  const { id } = params;

  if (!id) return defaultProps;

  try {
    const { data: movieData } = await client.query<{ movie: MovieResponse }>({
      query: GET_MOVIE,
      variables: { movieId: id },
    });

    const { data: creditsData } = await client.query<{
      getMovieCredits: MovieCreditsResponse;
    }>({
      query: GET_MOVIE_CREDITS,
      variables: { movieId: id },
    });

    // TODO if dont find movie return 404

    return {
      props: {
        movie: movieData.movie,
        credits: creditsData.getMovieCredits,
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

const Movie: NextPage<{
  movie: MovieResponse;
  credits: MovieCreditsResponse;
}> = ({ movie, credits }) => <MovieView movie={movie} credits={credits} />;

export default Movie;
