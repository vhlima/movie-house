import type { MovieCharacter } from '@/graphql';

import { Typography } from '@/components';

import { ActorProfilePicture } from './components';

interface MovieActorProps {
  actor: {
    id: MovieCharacter['id'];
    character: MovieCharacter['character'];
    originalName: MovieCharacter['originalName'];
    profilePictureUrl: MovieCharacter['profilePictureUrl'];
  };
}

const MovieActor: React.FC<MovieActorProps> = ({ actor }) => {
  const { character, originalName, profilePictureUrl } = actor;

  return (
    <div className="flex flex-col items-center text-center w-24 flex-shrink-0">
      <ActorProfilePicture
        profilePictureUrl={profilePictureUrl}
        alt={originalName}
      />

      <Typography
        className="font-semibold mt-2 group-hover:underline"
        component="h2"
        color="primary"
      >
        {originalName}
      </Typography>

      <Typography className="mt-1" component="span" size="xs">
        {character}
      </Typography>
    </div>
  );
};

export default MovieActor;
