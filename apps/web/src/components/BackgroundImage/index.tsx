import type { ImageProps } from 'next/image';

import Image from '../Image';

const BackgroundImage: React.FC<ImageProps> = ({ ...imageProps }) => (
  <div className="w-full h-48 absolute z-0">
    <Image layout="fill" objectFit="fill" {...imageProps} />

    <div
      className="relative h-full"
      style={{
        imageRendering: 'pixelated',
        backgroundImage:
          'linear-gradient(to bottom, transparent, rgba(18, 18, 20, 0.60), #121214)',
      }}
    />
  </div>
);

export default BackgroundImage;
