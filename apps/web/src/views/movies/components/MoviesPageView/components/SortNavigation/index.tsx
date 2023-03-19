import { Typography } from '@/components';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

import {
  SortByGenreButton,
  SortByDecadeButton,
  SortByPopularButton,
  SortByRatingButton,
  SortByServiceButton,
} from '@/components/Sort';

const NAVIGATION_PATH = '/movies';

const SortNavigation: React.FC = () => (
  <div className="flex items-center">
    <Typography
      className="uppercase mr-2 hidden md:block"
      component="h2"
      color="primary"
      size="sm"
    >
      Browse by
    </Typography>

    <div className="grid grid-cols-3 md:flex border border-grey-700 rounded-sm">
      <SingleDropdown>
        <SortByDecadeButton pathname={NAVIGATION_PATH} />

        <SortByRatingButton pathname={NAVIGATION_PATH} />

        <SortByPopularButton pathname={NAVIGATION_PATH} />

        <SortByGenreButton pathname={NAVIGATION_PATH} />

        <SortByServiceButton pathname={NAVIGATION_PATH} />
      </SingleDropdown>
    </div>
  </div>
);

export default SortNavigation;
