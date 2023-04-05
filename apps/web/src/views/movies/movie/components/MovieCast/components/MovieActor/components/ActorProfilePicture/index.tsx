import { Image, Typography } from '@/components';

interface Props {
  alt: string;
  profilePictureUrl?: string;
}

export const ActorProfilePicture: React.FC<Props> = props => {
  const { profilePictureUrl, alt } = props;

  return (
    <div className="relative w-20 h-20 border-grey-800 border rounded-full overflow-hidden">
      {!profilePictureUrl ? (
        <div
          className="flex items-center justify-center w-full h-full bg-grey-800 select-none"
          data-testid="actor-profile-picture-empty"
        >
          <Typography component="span" color="primary" size="4xl">
            ?
          </Typography>
        </div>
      ) : (
        <Image
          style={{ objectFit: 'cover' }}
          fill
          sizes="5rem, 5rem"
          alt={alt}
          src={profilePictureUrl}
          data-testid="actor-profile-picture"
        />
      )}
    </div>
  );
};
