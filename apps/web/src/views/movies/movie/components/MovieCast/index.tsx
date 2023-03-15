import type { MovieCharacter } from '@/graphql';

import Card from '../../../../../components/Card';
import Typography from '../../../../../components/Typography';

import MovieActor from './components/MovieActor';

interface MovieCastProps {
  cast: Array<{
    id: MovieCharacter['id'];
    character: MovieCharacter['character'];
    originalName: MovieCharacter['originalName'];
    profilePictureUrl: MovieCharacter['profilePictureUrl'];
  }>;
}

const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
  const hasCast = cast && cast.length > 0;

  return (
    <Card>
      <Card.Header title="Main cast" marginBottom />

      <Card.Body>
        {!hasCast ? (
          <Typography component="h2">
            The cast for this film was not found.
          </Typography>
        ) : (
          <ul className="flex overflow-x-auto pb-4">
            {cast.slice(0, 10).map(actor => (
              <MovieActor key={`movie-actor-${actor.id}`} actor={actor} />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCast;
