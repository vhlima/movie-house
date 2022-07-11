import clsx from 'clsx';
import Skeleton from '../../../../../components/Skeleton';

interface MovieCoverSkeletonProps {
  className?: string;
  coverSize?: 'lg' | 'md' | 'sm' | 'full';
}

const MovieCoverSkeleton: React.FC<MovieCoverSkeletonProps> = ({
  className,
  coverSize = 'sm',
}) => (
  <Skeleton
    className={clsx('flex-shrink-0', className, {
      'w-20 h-28': coverSize === 'sm',
      'w-full h-full': coverSize === 'full',
    })}
  />
);

export default MovieCoverSkeleton;
