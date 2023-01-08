import clsx from 'clsx';

import type {
  ButtonHTMLAttributes,
  ElementType,
  PropsWithChildren,
} from 'react';

import type { Movie } from '../../../graphql';

import Image from '../../Image';

import MovieLink from '../MovieLink';

import MovieCoverButton from './components/MovieCoverButton';

interface MovieCoverProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  movie?: Partial<Pick<Movie, 'id'>> &
    Pick<Movie, 'originalTitle' | 'posterUrl'>;
  sizeType?: 'responsive' | 'sm' | 'md';
  listItem?: boolean;
}

const MovieCover: React.FC<PropsWithChildren<MovieCoverProps>> = ({
  className,
  sizeType = 'responsive',
  movie,
  listItem,
  children,
  ...buttonProps
}) => {
  const containerClassNames = clsx(
    'relative w-full h-full select-none text-grey-500 rounded-md overflow-hidden border border-grey-700 transition-colors',
    {
      'max-w-[6rem] min-w-[5rem] max-h-[8.75rem]': sizeType === 'sm',
      'max-w-[7rem] min-w-[7rem] max-h-[11rem]': sizeType === 'md',
      [className]: !!className,
    },
  );

  const imageJsx = (
    <>
      {movie ? (
        <Image
          title={movie.originalTitle}
          layout="responsive"
          width={150}
          height={225}
          src={movie.posterUrl}
          alt={movie.originalTitle}
        />
      ) : (
        <span className="text-3xl">?</span>
      )}

      {children}
    </>
  );

  if ((!movie || !movie.id) && !buttonProps.onClick) {
    const ContainerElement: ElementType = listItem ? 'li' : 'div';

    return (
      <ContainerElement
        className={clsx(containerClassNames, {
          'flex items-center justify-center': !movie,
        })}
      >
        {imageJsx}
      </ContainerElement>
    );
  }

  if (buttonProps.onClick) {
    const movieCoverButton = (
      <MovieCoverButton listItem={listItem} {...buttonProps}>
        {children}
      </MovieCoverButton>
    );

    return listItem ? (
      <li className={containerClassNames}>{movieCoverButton}</li>
    ) : (
      movieCoverButton
    );
  }

  const linkContainer = (
    <MovieLink
      className={!listItem ? containerClassNames : ''}
      movieId={movie.id}
    >
      {imageJsx}
    </MovieLink>
  );

  if (listItem) {
    return (
      <li className={containerClassNames} title={movie.originalTitle}>
        {linkContainer}
      </li>
    );
  }

  return linkContainer;
};

export default MovieCover;
