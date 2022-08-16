import type { PropsWithChildren } from 'react';

import Skeleton from '../../../../Skeleton';

import PageContent from '../../../../PageContent';

const CommentaryBodySkeleton: React.FC<PropsWithChildren> = ({ children }) => (
  <PageContent className="flex flex-col gap-2 animate-pulse">
    <Skeleton className="w-full h-6" />

    <Skeleton className="w-full h-24" />

    {children}
  </PageContent>
);

export default CommentaryBodySkeleton;
