import Image, { ImageProps } from 'next/image';

const BackgroundImage: React.FC<ImageProps> = ({ ...imageProps }) => (
  <div className="w-full h-48 absolute z-0">
    <Image layout="fill" objectFit="fill" {...imageProps} />

    <div
      className="relative h-full"
      style={{
        imageRendering: 'pixelated',
        backgroundImage:
          'linear-gradient(to bottom, transparent, rgba(37, 37, 37, 0.61), #121214)',
      }}
    />
  </div>
);

export default BackgroundImage;
