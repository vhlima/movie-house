import type { FindMovieWithCreditsQuery } from '@/graphql';

import { MovieCover } from '@/components/movie';

import { Button, Typography } from '@/components';

import { MovieDetails } from './components';

interface Props {
  movie: FindMovieWithCreditsQuery['movieWithCredits'];
}

export const MovieHeader: React.FC<Props> = props => {
  const { movie } = props;

  // TODO change that, not showing #1 director
  const directors = movie.credits.crew.filter(
    crew => crew.department.toLowerCase() === 'directing',
  );

  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-col w-full z-10">
        <MovieDetails
          originalTitle={movie.originalTitle}
          releaseDate={movie.releaseDate}
          runtime={movie.runtime}
        />

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
