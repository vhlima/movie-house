import type { MovieCharacter } from '@/graphql';

import { Typography, Card } from '@/components';

import MovieActor from './components/MovieActor';

interface MovieCastProps {
  cast: Array<{
    id: MovieCharacter['id'];
    character: MovieCharacter['character'];
    originalName: MovieCharacter['originalName'];
    profilePictureUrl: MovieCharacter['profilePictureUrl'];
  }>;
}

export const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
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
          <ul className="flex overflow-x-auto">
            {cast.slice(0, 10).map(actor => (
              <MovieActor
                key={`movie-actor-${actor.id}`}
                id={actor.id}
                character={actor.character}
                originalName={actor.originalName}
                profilePictureUrl={actor.profilePictureUrl}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};
