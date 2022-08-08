import NextImage from 'next/image';

import type { ImageProps } from 'next/image';

const Image: React.FC<ImageProps> = ({ src, ...props }) =>
  !src ? <h1>Image not found</h1> : <NextImage src={src} {...props} />;

export default Image;
