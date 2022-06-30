import React, { PropsWithChildren } from 'react';

import Image, { ImageProps } from 'next/image';

const MovieCoverImage: React.FC<PropsWithChildren<ImageProps>> = ({
  children,
  ...imageProps
}) => (
  <div className="w-24 h-32 flex-shrink-0 relative rounded-md border border-grey-700 overflow-hidden">
    <Image layout="fill" objectFit="fill" {...imageProps} />

    {children}
  </div>
);

export default MovieCoverImage;
