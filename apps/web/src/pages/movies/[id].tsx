import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type { MovieCreditsResponse, MovieResponse } from '../../types/movie';

import { GET_MOVIE, GET_MOVIE_CREDITS } from '../../graphql/movie';

import client from '../../api';

import MovieView from '../../views/movies/view';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultProps = { props: { movie: undefined, credits: undefined } };

  const { id } = params;

  if (!id) return defaultProps;

  try {
    const movieResponse = await client.query<{ getMovie: MovieResponse }>({
      query: GET_MOVIE,
      variables: { movieId: id },
    });

    const movieCreditsResponse = await client.query<{
      getMovieCredits: MovieCreditsResponse;
    }>({
      query: GET_MOVIE_CREDITS,
      variables: { movieId: id },
    });

    return {
      props: {
        movie: movieResponse.data.getMovie,
        credits: movieCreditsResponse.data.getMovieCredits,
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
