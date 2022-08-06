import type { PropsWithChildren } from 'react';

import type { MovieResponse } from '../../../../types/movie';

import MovieCover from '../../components/Cover';

import BackgroundImage from '../../components/BackgroundImage';

import Button from '../../../../components/Button';
import MovieRatingStar from '../../components/RatingStar';
import PageContent from '../../../../components/PageContent';

interface MovieHeaderProps {
  movie: MovieResponse;
}

const MovieHeader: React.FC<PropsWithChildren<MovieHeaderProps>> = ({
  movie,
  children,
}) => {
  function toHoursAndMinutes(totalMinutes: number) {
    const minutes = totalMinutes % 60;

    const hours = Math.floor(totalMinutes / 60);

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  }

  const movieDate = new Date(movie.release_date);

  return (
    <>
      <BackgroundImage src={movie.backdropUrl} />

      <PageContent className="mt-40">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col z-10">
            <h1 className="text-grey-100 text-2xl font-semibold">
              {movie.original_title}
            </h1>

            <div className="text-grey-200 mb-2">
              <div className="flex items-center gap-1">
                <MovieRatingStar color="yellow" rating={8.3} checked />

                <span>•</span>

                <span className="text-sm">
                  {movieDate.getMonth()}/{movieDate.getDay()}/
                  {movieDate.getFullYear()}
                </span>

                <span>•</span>

                <span className="text-sm">
                  {toHoursAndMinutes(movie.runtime)}
                </span>
              </div>

              <span className="text-sm uppercase mr-1">Directed by</span>

              <span className="text-sm font-semibold">Steven Spielberg</span>
            </div>

            <div className="flex items-center gap-1 text-grey-200 mt-auto">
              <Button buttonStyle="secondary" buttonSize="xs" full={false}>
                Watch trailer
              </Button>

              <div className="rounded-md border border-grey-700 px-1 bg-opacity-60">
                <span>18</span>
              </div>
            </div>
          </div>

          <MovieCover coverUrl={movie.posterUrl} />
        </div>

        {children}
      </PageContent>
    </>
  );
};

export default MovieHeader;
