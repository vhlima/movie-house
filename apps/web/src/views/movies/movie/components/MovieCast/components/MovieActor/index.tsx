import type { MovieCharacter } from '@/graphql';

import { Typography } from '@/components';
import Image from '../../../../../../../components/Image';

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
    <div className="flex flex-col gap-1 w-24 flex-shrink-0">
      <div className="flex flex-col gap-2 items-center group">
        <div className="relative w-20 h-20 border-grey-800 border rounded-full overflow-hidden hover:opacity-60">
          {!profilePictureUrl ? (
            <div className="flex items-center justify-center w-full h-full bg-grey-800 select-none">
              <Typography component="span" color="primary" size="4xl">
                ?
              </Typography>
            </div>
          ) : (
            <Image
              style={{ objectFit: 'cover' }}
              fill
              sizes="5rem, 5rem"
              alt={originalName}
              src={profilePictureUrl}
            />
          )}
        </div>

        <Typography
          className="font-semibold text-center group-hover:underline"
          component="h2"
          color="primary"
        >
          {originalName}
        </Typography>
      </div>

      <Typography className="text-center" component="span" size="xs">
        {character}
      </Typography>
    </div>
  );
};

export default MovieActor;
