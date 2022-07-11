import type { PropsWithChildren } from 'react';

import Skeleton from '../../../../../components/Skeleton';

import MovieCoverSkeleton from '../../../components/Cover/Skeleton';

const MovieHeaderSkeleton: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    {/* <BackgroundImage src={movie.backdropUrl} /> */}

    <div className="p-3 mt-40 animate-pulse">
      <div className="flex justify-between">
        <div className="flex flex-col w-full z-10">
          <Skeleton className="h-8" />

          <Skeleton className="h-6 mt-1 mb-2" />

          <Skeleton className="h-8 mt-auto" />
        </div>

        <MovieCoverSkeleton className="ml-2" />
      </div>

      {children}
    </div>
  </>
);

export default MovieHeaderSkeleton;
