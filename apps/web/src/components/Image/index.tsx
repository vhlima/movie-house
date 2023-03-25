import NextImage from 'next/image';

import type { ImageProps } from 'next/image';

import { Typography } from '@/components';

export const Image: React.FC<ImageProps> = ({ src, ...props }) =>
  !src ? (
    <Typography component="span">Image not found</Typography>
  ) : (
    <NextImage src={src} {...props} />
  );
