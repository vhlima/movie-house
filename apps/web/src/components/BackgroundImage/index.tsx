import type { ImageProps } from 'next/image';

import Image from '../Image';

const BackgroundImage: React.FC<ImageProps> = ({ ...imageProps }) => (
  <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96">
    <div className="w-full h-full absolute">
      <Image layout="fill" objectFit="fill" {...imageProps} />

      <div
        className="absolute h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(to left, transparent, rgba(18, 18, 20, 0.20), #121214)',
        }}
      />

      <div
        className="absolute h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(to right, transparent, rgba(18, 18, 20, 0.20), #121214)',
        }}
      />

      <div
        className="absolute h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent, rgba(18, 18, 20, 0.20), #121214)',
        }}
      />
    </div>
  </div>
);

export default BackgroundImage;
