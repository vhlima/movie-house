import clsx from 'clsx';

import Image from 'next/image';

import type { ImageProps } from 'next/image';

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
        'w-6 h-6': imageSize === 'sm',
        'w-9 h-9': imageSize === 'md',
        'w-16 h-16': imageSize === 'lg',
      },
    )}
  >
    <Image layout="fill" objectFit="cover" {...imageProps} />
  </div>
);

export default ProfilePicture;
