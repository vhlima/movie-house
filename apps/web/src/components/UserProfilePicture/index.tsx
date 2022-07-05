import React from 'react';

import clsx from 'clsx';

import Image, { ImageProps } from 'next/image';

interface UserProfilePictureProps extends ImageProps {
  imageSize: 'lg' | 'md' | 'sm';
}

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({
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

export default UserProfilePicture;
