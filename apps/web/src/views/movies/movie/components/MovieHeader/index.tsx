import type { FindMovieWithCreditsQuery } from '@/graphql';

import { MovieCover } from '@/components/movie';

import { parseISO } from '@/utils/date-utils';

import { Button, Typography } from '@/components';

interface MovieInfosProps {
  movie: FindMovieWithCreditsQuery['movieWithCredits'];
}

export const MovieHeader: React.FC<MovieInfosProps> = ({ movie }) => {
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
        <Typography
          className="font-bold"
          component="h1"
          color="primary"
          size="2xl"
        >
          {movie.originalTitle}
        </Typography>

        <Typography component="span" size="sm">
          {movieDate.getMonth()}/{movieDate.getDay()}/{movieDate.getFullYear()}
          &nbsp; • &nbsp;
          {toHoursAndMinutes(movie.runtime)}
        </Typography>

        {directors.length > 0 && (
          <Typography component="span">
            Directed by&nbsp;
            <Typography component="strong" color="primary">
              {directors[0].originalName}
            </Typography>
          </Typography>
        )}

        <div className="flex items-center gap-2 mt-2">
          <Button intent="secondary" size="sm" full={false}>
            Watch trailer
          </Button>

          <div className="rounded-md border border-grey-700 px-2 py-1">
            <Typography component="span">18</Typography>
          </div>
        </div>
      </div>

      <MovieCover
        movie={movie}
        sizeType="md"
        link={false}
        borderHover={false}
      />
    </div>
  );
};
