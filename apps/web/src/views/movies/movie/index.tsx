import { useAuth } from '@/hooks/useAuth';

import type { FindMovieWithCreditsQuery } from '@/graphql';

import { TextShorter } from '@/components';

import BackdropImage from '../../../components/BackdropImage';

import {
  MovieCast,
  MovieGenres,
  MoviePopularLists,
  MovieActionsButton,
  MovieRecentReviews,
  MoviePopularReviews,
  MoviesRelated,
  MovieHeader,
} from './components';

type MovieViewProps = FindMovieWithCreditsQuery;

const MovieView: React.FC<MovieViewProps> = ({ movieWithCredits: movie }) => {
  const { data: session } = useAuth();

  const directors = movie.credits.crew.filter(
    crew => crew.department.toLowerCase() === 'directing',
  );

  const directedBy = directors.length > 0 ? directors[0].originalName : '';

  return (
    <BackdropImage src={movie.backdropUrl} alt={movie.originalTitle}>
      <MovieHeader
        id={movie.id}
        originalTitle={movie.originalTitle}
        releaseDate={movie.releaseDate}
        runtime={movie.runtime}
        posterUrl={movie.posterUrl}
        directedBy={directedBy}
      />

      <div className="flex flex-col gap-4 mt-4">
        <TextShorter text={movie.overview} maxCharacters={200} />

        <MovieGenres genres={movie.genres} />

        {session && (
          <MovieActionsButton
            id={movie.id}
            originalTitle={movie.originalTitle}
          />
        )}

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
