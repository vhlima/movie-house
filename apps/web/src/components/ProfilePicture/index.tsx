import clsx from 'clsx';

import type { ImageProps } from 'next/image';

import Image from '../Image';

interface ProfilePictureProps extends ImageProps {
  imageSize: 'lg' | 'md' | 'sm';
}

/* 
  This component is used in any case we need to show any profile picture. 
*/

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageSize,
  ...imageProps
}) => (
  <div
    className={clsx(
      'relative flex-shrink-0 border border-grey-700 rounded-full overflow-hidden',
      {
        'w-7 h-7': imageSize === 'sm',
        'w-10 h-10': imageSize === 'md',
        'w-16 h-16': imageSize === 'lg',
      },
    )}
  >
    <Image
      layout="fill"
      objectFit="cover"
      alt="User profile picture"
      {...imageProps}
    />
  </div>
);

export default ProfilePicture;
