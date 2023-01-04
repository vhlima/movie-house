import clsx from 'clsx';

import type { PropsWithChildren, ReactNode, ReactElement } from 'react';

import type { ImageProps } from 'next/image';

import Image from '../Image';

const BackdropImage: React.FC<PropsWithChildren<ImageProps>> = ({
  className,
  children,
  ...imageProps
}) =>
  !imageProps.src ? (
    (children as ReactNode & ReactElement)
  ) : (
    <>
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[26rem]">
        <Image
          layout="fill"
          objectFit="fill"
          unoptimized
          priority
          {...imageProps}
        />

        <div
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to left, transparent, rgba(18, 18, 20, 0.05), #121214)',
          }}
        />

        <div
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, transparent, rgba(18, 18, 20, 0.05), #121214)',
          }}
        />

        <div
          className="absolute h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent, rgba(18, 18, 20, 0.05), #121214)',
          }}
        />
      </div>

      <div className={clsx('-mt-12', className && className)}>{children}</div>
    </>
  );

export default BackdropImage;
