import { Typography } from '@/components';

import { ActorProfilePicture } from './components';

interface Props {
  id: number;
  character: string;
  originalName: string;
  profilePictureUrl?: string;
}

export const MovieActor: React.FC<Props> = props => {
  const { character, originalName, profilePictureUrl } = props;

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
        data-testid="actor-original-name"
      >
        {originalName}
      </Typography>

      <Typography
        className="mt-1"
        component="span"
        size="xs"
        data-testid="actor-character-name"
      >
        {character}
      </Typography>
    </div>
  );
};
