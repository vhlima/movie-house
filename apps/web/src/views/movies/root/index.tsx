import { useRouter } from 'next/router';

import { Movie } from '../../../graphql';

import { MovieContextProvider } from './hooks/useMovie';

import { useAuth } from '../../../hooks/useAuth';

import Card from '../../../components/Card';

import PageContent from '../../../components/PageContent';

import TextShorter from '../../../components/TextShorter';

import OptionsButton from './components/OptionsButton';

import MovieCast from './components/MovieCast';

import Button from '../../../components/Button';

import RecentReviews from './components/Reviews/RecentReviews';

import BackdropImage from '../../../components/BackdropImage';

import MovieInfos from '../../../components/movie/MovieInfos';

import PopularReviews from './components/Reviews/PopularReviews';

import MovieGenres from './components/MovieGenres';

import MovieInfosSkeleton from '../../../components/movie/MovieInfos/Skeleton';

interface MovieViewProps {
  movie: Movie;
}

const MovieView: React.FC<MovieViewProps> = ({ movie }) => {
  const { data: session } = useAuth();

  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieInfosSkeleton />;
  }

  return (
    <BackdropImage src={movie.backdropUrl} alt={movie.originalTitle}>
      <PageContent>
        <MovieContextProvider movie={movie}>
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

            <MovieGenres />

            {session && <OptionsButton />}

            <MovieCast />

            <PopularReviews />

            <RecentReviews />

            <Card title="Similar movies" noPadding />

            <Card title="Popular lists" noPadding />
          </article>
        </MovieContextProvider>
      </PageContent>
    </BackdropImage>
  );
};

export default MovieView;
