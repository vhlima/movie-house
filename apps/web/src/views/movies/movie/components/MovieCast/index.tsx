import { Card } from '@/components';

import { MovieActorList } from './components';

interface MovieCastProps {
  cast: Array<{
    id: number;
    character: string;
    originalName: string;
    profilePictureUrl?: string;
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
