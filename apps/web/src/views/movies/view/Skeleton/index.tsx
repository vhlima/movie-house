import MovieBodySkeleton from '../Body/Skeleton';

import MovieHeaderSkeleton from '../Header/Skeleton';

const MovieViewSkeleton: React.FC = () => (
  <MovieHeaderSkeleton>
    <MovieBodySkeleton />
  </MovieHeaderSkeleton>
);

export default MovieViewSkeleton;
