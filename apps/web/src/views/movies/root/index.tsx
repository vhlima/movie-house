import { useMemo } from 'react';

import { useRouter } from 'next/router';

import type { Movie } from '../../../graphql';

import type { MovieContextData } from './hooks/useMovie';

import { MovieContext } from './hooks/useMovie';

import { useAuth } from '../../../hooks/useAuth';

import Card from '../../../components/Card';

import UserMovieList from '../../users/lists';

import PageContent from '../../../components/PageContent';

import BackgroundImage from '../../../components/BackgroundImage';

import TextShorter from '../../../components/TextShorter';

import Link from '../../../components/Link';

import OptionsButton from './components/OptionsButton';

import MovieCast from './components/MovieCast';

import MovieViewSkeleton from '../view/Skeleton';

import MovieHeader from '../view/Header';

interface MovieViewProps {
  movie: Movie;
}

const MovieView: React.FC<MovieViewProps> = ({ movie }) => {
  const { user } = useAuth();

  const contextProviderValue = useMemo(
    () => ({ movie } as MovieContextData),
    [movie],
  );

  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieViewSkeleton />;
  }

  if (!movie) {
    return <h1 className="text-danger-base">Movie not found</h1>;
  }

  // TODO create hook to pass movie without prop drilling

  return (
    <>
      <BackgroundImage src={movie.backdropUrl} />

      <PageContent className="mt-40">
        <MovieContext.Provider value={contextProviderValue}>
          <MovieHeader movie={movie} />

          <div className="flex flex-col gap-4">
            <TextShorter
              className="text-grey-200 mt-4"
              text={movie.overview}
              maxCharacters={200}
            />

            <div className="flex gap-2 flex-wrap">
              {movie.genres.map(genre => (
                <Link
                  className="py-1 px-2 border rounded-md border-grey-700 transition-colors hover:bg-grey-600"
                  key={`genre-${genre.id}`}
                  href="/"
                >
                  <h1 className="text-grey-100 whitespace-nowrap">
                    {genre.name}
                  </h1>
                </Link>
              ))}
            </div>

            {user && <OptionsButton />}

            <MovieCast />

            <Card title="Popular reviews" link={{ href: '/' }} noPadding>
              <div>
                {/* <UserMovieReviewBody preview /> */}
                {/* <UserMovieReviewBody preview /> */}
                {/* <UserMovieReviewBody preview /> */}
              </div>
            </Card>

            <Card title="Recent reviews" link={{ href: '/' }} noPadding>
              <div>
                {/* <UserMovieReviewBody preview /> */}
                {/* <UserMovieReviewBody preview /> */}
                {/* <UserMovieReviewBody preview /> */}
              </div>
            </Card>

            <Card title="Similar movies" noPadding>
              {/* <div className="flex gap-2">
    {movieList.map(m => (
      <Link key={m.id} className="hover:opacity-60" href="/">
        <MovieCover coverUrl={m.coverUrl} />
      </Link>
    ))}
  </div> */}
            </Card>

            <Card title="Popular lists" noPadding>
              <UserMovieList />
            </Card>
          </div>
        </MovieContext.Provider>
      </PageContent>
    </>
  );
};

export default MovieView;
