import type { PropsWithChildren } from 'react';

import { PopularMoviesWeek } from '@/components/movie';
import RecentReviews from '../../../components/review/RecentReviews';
import PopularReviewsWeek from '../../../components/review/PopularReviewsWeek';

import MoviesPageView from '../components/MoviesPageView';

const MoviesRootPageView: React.FC<PropsWithChildren> = () => (
  <MoviesPageView>
    <PopularMoviesWeek />

    <RecentReviews />

    <PopularReviewsWeek />
  </MoviesPageView>
);

export default MoviesRootPageView;
