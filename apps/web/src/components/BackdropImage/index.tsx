import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import type { ImageProps } from 'next/image';

import { Image } from '@/components';

const BackdropImage: React.FC<PropsWithChildren<ImageProps>> = ({
  className,
  children,
  ...imageProps
}) => (
  <>
    {imageProps.src && (
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          sizes="(min-width: 1024px) 1200px, (min-width: 640px) 500px, 100vw"
          style={{ objectFit: 'cover' }}
          fill
          priority
          {...imageProps}
        />

        <div
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to left, transparent, rgba(18, 18, 20, 0.02), #121214)',
          }}
        />

        <div
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, transparent, rgba(18, 18, 20, 0.02), #121214)',
          }}
        />

        <div
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent, rgba(18, 18, 20, 0.02), #121214)',
          }}
        />
      </div>
    )}

    <div
      className={clsx(
        {
          '-mt-16 lg:-mt-24': !!imageProps.src,
          'mt-4': !imageProps.src,
        },
        className && className,
      )}
    >
      {children}
    </div>
  </>
);

export default BackdropImage;
