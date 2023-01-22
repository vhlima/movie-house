import NextImage from 'next/image';

import type { ImageProps } from 'next/image';

import Typography from '../Typography';

const Image: React.FC<ImageProps> = ({ src, ...props }) =>
  !src ? (
    <Typography component="span">Image not found</Typography>
  ) : (
    <NextImage src={src} {...props} />
  );

export default Image;
