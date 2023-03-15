import type { PropsWithChildren } from 'react';

import { MovieCover } from '@/components/movie';

import Skeleton from '../../../Skeleton';

const MovieInfosSkeleton: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="p-3 mt-40 animate-pulse">
    <div className="flex justify-between">
      <div className="flex flex-col w-full z-10">
        <Skeleton className="h-8" />

        <Skeleton className="h-6 mt-1 mb-2" />

        <Skeleton className="h-8 mt-auto" />
      </div>

      <MovieCover className="ml-2" />
    </div>

    {children}
  </div>
);

export default MovieInfosSkeleton;
