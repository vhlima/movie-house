import type { PropsWithChildren } from 'react';

import { PageContent } from '@/components';

import { MovieSearchBar, SortNavigation } from './components';

const MoviesPageView: React.FC<PropsWithChildren> = ({ children }) => (
  <PageContent className="flex flex-col gap-4 mt-4">
    <nav className="flex flex-col items-center lg:flex-row">
      <SortNavigation />

      <MovieSearchBar />
    </nav>

    {children}
  </PageContent>
);

export default MoviesPageView;
