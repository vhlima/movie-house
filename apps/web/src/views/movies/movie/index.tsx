import { useAuth } from '@/hooks/useAuth';

import type { FindMovieWithCreditsQuery } from '@/graphql';

import { TextShorter } from '@/components';

import BackdropImage from '../../../components/BackdropImage';

import {
  MovieCast,
  MovieGenres,
  MoviePopularLists,
  MovieOptionsButton,
  MovieRecentReviews,
  MoviePopularReviews,
  MoviesRelated,
  MovieHeader,
} from './components';

type MovieViewProps = FindMovieWithCreditsQuery;

const MovieView: React.FC<MovieViewProps> = ({ movieWithCredits: movie }) => {
  const { data: session } = useAuth();

  return (
    <BackdropImage src={movie.backdropUrl} alt={movie.originalTitle}>
      <MovieHeader movie={movie} />

      <div className="flex flex-col gap-4 mt-4">
        <TextShorter text={movie.overview} maxCharacters={200} />

        <MovieGenres genres={movie.genres} />

        {session && <MovieOptionsButton movie={movie} />}

        <MovieCast cast={movie.credits.cast} />

        <MoviePopularReviews movieId={movie.id} />

        <MovieRecentReviews movieId={movie.id} />

        <MoviesRelated movieId={movie.id} />

        <MoviePopularLists movieId={movie.id} />
      </div>
    </BackdropImage>
  );
};

export default MovieView;
