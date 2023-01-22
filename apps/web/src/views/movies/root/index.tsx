import { useAuth } from '../../../hooks/useAuth';

import { useFindFullMovieQuery } from '../../../graphql';

import Button from '../../../components/Button';
import PageContent from '../../../components/PageContent';
import TextShorter from '../../../components/TextShorter';
import BackdropImage from '../../../components/BackdropImage';
import MovieInfos from '../../../components/movie/MovieInfos';

import MovieCast from './components/MovieCast';
import MovieGenres from './components/MovieGenres';
import MoviePopularLists from './components/MoviePopularLists';
import MovieOptionsButton from './components/MovieOptionsButton';
import MovieRecentReviews from './components/MovieRecentReviews';
import MoviePopularReviews from './components/MoviePopularReviews';

interface MovieViewProps {
  movieId: number;
}

const MovieView: React.FC<MovieViewProps> = ({ movieId }) => {
  const { data: session } = useAuth();

  const {
    data: { movie },
  } = useFindFullMovieQuery({ variables: { movieId } });

  return (
    <BackdropImage src={movie.backdropUrl} alt={movie.originalTitle}>
      <PageContent>
        <MovieInfos movie={movie}>
          <div className="flex items-center gap-1 text-grey-200 mt-2">
            <Button
              className="text-sm"
              buttonStyle="secondary"
              buttonSize="xs"
              full={false}
            >
              Watch trailer
            </Button>

            <div className="rounded-md border border-grey-700 px-1 bg-opacity-60">
              <span>18</span>
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

          <MoviePopularLists movieId={movie.id} />

          {/* <Card title="Similar movies" noPadding /> */}
        </article>
      </PageContent>
    </BackdropImage>
  );
};

export default MovieView;
