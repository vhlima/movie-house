import { useAuth } from '@/hooks/useAuth';

import type { FindMovieWithCreditsQuery } from '@/graphql';

import { Button, TextShorter, Typography } from '@/components';
import { MovieInfos } from '@/components/movie';
import BackdropImage from '../../../components/BackdropImage';

import MovieCast from './components/MovieCast';
import MovieGenres from './components/MovieGenres';
import MoviePopularLists from './components/MoviePopularLists';
import MovieOptionsButton from './components/MovieOptionsButton';
import MovieRecentReviews from './components/MovieRecentReviews';
import MoviePopularReviews from './components/MoviePopularReviews';
import MoviesRelated from './components/MoviesRelated';

type MovieViewProps = FindMovieWithCreditsQuery;

const MovieView: React.FC<MovieViewProps> = ({ movieWithCredits: movie }) => {
  const { data: session } = useAuth();

  return (
    <BackdropImage src={movie.backdropUrl} alt={movie.originalTitle}>
      <MovieInfos movie={movie}>
        <div className="flex items-center gap-2 mt-2">
          <Button intent="secondary" size="sm" full={false}>
            Watch trailer
          </Button>

          <div className="rounded-md border border-grey-700 px-2 py-1">
            <Typography component="span">18</Typography>
          </div>
        </div>
      </MovieInfos>

      <article className="flex flex-col gap-4 mt-4">
        <TextShorter
          className="text-grey-200"
          text={movie.overview}
          maxCharacters={200}
        />

        <MovieGenres genres={movie.genres} />

        {session && <MovieOptionsButton movie={movie} />}

        <MovieCast cast={movie.credits.cast} />

        <MoviePopularReviews movieId={movie.id} />

        <MovieRecentReviews movieId={movie.id} />

        <MoviesRelated movieId={movie.id} />

        <MoviePopularLists movieId={movie.id} />
      </article>
    </BackdropImage>
  );
};

export default MovieView;
