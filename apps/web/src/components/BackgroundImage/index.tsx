import React from 'react';

import Image, { ImageProps } from 'next/image';

const BackgroundImage: React.FC<ImageProps> = ({ ...imageProps }) => (
  <div className="w-full h-48 absolute z-0">
    <Image layout="fill" objectFit="fill" {...imageProps} />

    <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-t from-grey-900" />
  </div>
);

export default BackgroundImage;
