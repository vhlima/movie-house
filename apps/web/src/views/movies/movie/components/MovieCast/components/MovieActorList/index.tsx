import { Typography } from '@/components';

import { MovieActor } from '../index';

interface Props {
  actors: Array<{
    id: number;
    character: string;
    originalName: string;
    profilePictureUrl?: string;
  }>;
}

export const MovieActorList: React.FC<Props> = props => {
  const { actors } = props;

  if (actors.length === 0) {
    <Typography component="h2" data-testid="empty-list-message">
      The cast for this film was not found.
    </Typography>;
  }

  return (
    <ul className="flex overflow-x-auto" data-testid="actor-list">
      {actors.map(actor => (
        <MovieActor
          key={`movie-actor-${actor.id}`}
          id={actor.id}
          character={actor.character}
          originalName={actor.originalName}
          profilePictureUrl={actor.profilePictureUrl}
        />
      ))}
    </ul>
  );
};
