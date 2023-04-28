import type { Movie } from '@/gql';

import { NewMovieCover as MovieCover } from '@/components/movie';

import type { MovieCoverSize } from '@/components/movie';
import clsx from 'clsx';

interface Props {
  className?: string;
  size?: MovieCoverSize;
  movies: Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>[];
  maxAmount: number;
}

const accordionSizes: {
  [key in MovieCoverSize]: number;
} = {
  sm: 40,
  md: 50,
  lg: 70,
};

export const MovieCoverAccordion: React.FC<Props> = ({
  className,
  movies,
  maxAmount,
  size,
}) => {
  const sizeMargin = accordionSizes[size];

  const arr = [
    ...movies,
    ...Array.from({ length: maxAmount - movies.length }).map(
      (_, index) => movies.length + index,
    ),
  ];

  return (
    <ul className={clsx('flex', className && className)}>
      {arr.map((n, index) => (
        <li
          key={`list-preview-${typeof n === 'number' ? n : n.id}`}
          style={{
            zIndex: maxAmount - index,
            marginLeft: `-${index > 0 ? sizeMargin : 0}px`,
          }}
        >
          <MovieCover
            size={size}
            link={false}
            movie={typeof n !== 'number' ? n : undefined}
          />
        </li>
      ))}
    </ul>
  );
};
