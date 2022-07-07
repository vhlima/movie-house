import React from 'react';

import clsx from 'clsx';

import Image, { ImageProps } from 'next/image';

interface UserProfilePictureProps extends ImageProps {
  imageSize: 'lg' | 'md' | 'sm';
}

/* 
  This component is used in any case we need to show any user profile picture. 
*/

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
        'w-20 h-20': imageSize === 'lg',
      },
    )}
  >
    <Image layout="fill" objectFit="cover" {...imageProps} />
  </div>
);

export default UserProfilePicture;
