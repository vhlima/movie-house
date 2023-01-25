import { parseISO } from 'date-fns';

import type { PropsWithChildren } from 'react';

import type { Movie, Crew } from '../../../graphql';

import MovieCover from '../MovieCover';

interface MovieInfosProps {
  movie: {
    id: Movie['id'];
    originalTitle: Movie['originalTitle'];
    posterUrl: Movie['posterUrl'];
    runtime: Movie['runtime'];
    releaseDate?: Movie['releaseDate'];
    credits: {
      crew: Array<{
        originalName: Crew['originalName'];
        department: Crew['department'];
      }>;
    };
  };
}

const MovieInfos: React.FC<PropsWithChildren<MovieInfosProps>> = ({
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

  const movieDate = parseISO(movie.releaseDate);

  // TODO change that, not showing #1 director
  const directors = movie.credits.crew.filter(
    crew => crew.department === 'Directing',
  );

  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-col w-full z-10">
        <h1 className="text-grey-100 text-2xl font-semibold">
          {movie.originalTitle}
        </h1>

        <div className="text-grey-200">
          <div className="flex items-center gap-1">
            <span className="text-sm">
              {movieDate.getMonth()}/{movieDate.getDay()}/
              {movieDate.getFullYear()}
            </span>

            <span>•</span>

            <span className="text-sm">{toHoursAndMinutes(movie.runtime)}</span>
          </div>

          {directors.length > 0 && (
            <span className="text-sm mr-1">
              Directed by <strong>{directors[0].originalName}</strong>
            </span>
          )}
        </div>

        {children}
      </div>

      <MovieCover movie={movie} sizeType="md" />
    </div>
  );
};

export default MovieInfos;
