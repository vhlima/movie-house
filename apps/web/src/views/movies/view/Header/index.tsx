import type { PropsWithChildren } from 'react';

import type { MovieResponse } from '../../../../types/movie';

import MovieCover from '../../components/Cover';

import BackgroundImage from '../../components/BackgroundImage';

import Button from '../../../../components/Button';

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

      <div className="p-3 mt-40">
        <div className="flex justify-between">
          <div className="flex flex-col z-10">
            <h1 className="text-grey-100 text-2xl font-semibold">
              {movie.original_title}
            </h1>

            <div className="text-grey-200 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-sm">
                  {movieDate.getDay()}/{movieDate.getMonth()}/
                  {movieDate.getFullYear()}
                </span>

                <span>•</span>

                <span className="text-sm uppercase">Directed by</span>
              </div>

              <span className="text-sm font-semibold">
                {/* {movie.crew.find(c => c.role.includes('Director'))?.name || ''} */}
              </span>
            </div>

            <div className="flex items-center gap-1 text-grey-200 mt-auto">
              <Button buttonStyle="secondary" buttonSize="xs" full={false}>
                Watch trailer
              </Button>

              <div className="rounded-md border border-grey-700 px-1 bg-opacity-60">
                <span>18</span>
              </div>

              <span>{toHoursAndMinutes(movie.runtime)}</span>
            </div>
          </div>

          <MovieCover coverUrl={movie.posterUrl} />
        </div>

        {children}
      </div>
    </>
  );
};

export default MovieHeader;
