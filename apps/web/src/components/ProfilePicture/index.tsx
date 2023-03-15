import type { ImageProps } from 'next/image';

import { Image } from '@/components';

type ImageSizeType = 'lg' | 'md' | 'sm';

interface ProfilePictureProps extends Omit<ImageProps, 'alt'> {
  imageSize: ImageSizeType;
}

const sizes: {
  [key in ImageSizeType]: {
    width: number;
    height: number;
  };
} = {
  sm: {
    width: 28,
    height: 28,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 64,
    height: 64,
  },
};

/* 
  This component is used in any case we need to show any profile picture. 
*/

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageSize,
  ...imageProps
}) => (
  <div className="relative h-fit w-fit flex-shrink-0 border border-grey-700 rounded-full overflow-hidden">
    <Image
      width={sizes[imageSize].width}
      height={sizes[imageSize].height}
      alt="User profile picture"
      unoptimized
      {...imageProps}
    />
  </div>
);
