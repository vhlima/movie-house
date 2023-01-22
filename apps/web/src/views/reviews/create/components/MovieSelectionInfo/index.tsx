import type { Movie } from '../../../../../graphql';

import Typography from '../../../../../components/Typography';

import MovieLink from '../../../../../components/movie/MovieLink';

interface MovieSelectionInfoProps {
  movie?: {
    id: Movie['id'];
    originalTitle: Movie['originalTitle'];
    releaseDate?: Movie['releaseDate'];
  };
}

const MovieSelectionInfo: React.FC<MovieSelectionInfoProps> = ({ movie }) => (
  <div>
    {!movie ? (
      <div>
        <Typography
          className="whitespace-nowrap font-bold"
          component="h2"
          color="primary"
          size="lg"
        >
          No movie selected
        </Typography>

        <Typography component="p">
          Select the movie you want to review.
        </Typography>
      </div>
    ) : (
      <div className="flex items-center gap-x-1 flex-wrap">
        <MovieLink movieId={movie.id}>
          <Typography
            className="whitespace-nowrap font-bold"
            component="h2"
            color="primary"
            size="xl"
          >
            {movie.originalTitle}
          </Typography>
        </MovieLink>

        {movie.releaseDate && (
          <Typography component="span">
            ({new Date(movie.releaseDate).getFullYear()})
          </Typography>
        )}
      </div>
    )}
  </div>
);

export default MovieSelectionInfo;
