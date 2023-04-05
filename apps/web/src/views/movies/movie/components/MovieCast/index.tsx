import type { MovieCharacter } from '@/graphql';

import { Card } from '@/components';

import { MovieActorList } from './components';

interface MovieCastProps {
  cast: Array<{
    id: MovieCharacter['id'];
    character: MovieCharacter['character'];
    originalName: MovieCharacter['originalName'];
    profilePictureUrl: MovieCharacter['profilePictureUrl'];
  }>;
}

export const MovieCast: React.FC<MovieCastProps> = props => {
  const { cast } = props;

  return (
    <Card>
      <Card.Header title="Main cast" marginBottom />

      <Card.Body>
        <MovieActorList actors={cast || []} />
      </Card.Body>
    </Card>
  );
};
