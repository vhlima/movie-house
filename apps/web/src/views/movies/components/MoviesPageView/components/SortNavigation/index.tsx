import { Typography } from '@/components';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

import {
  SortByGenreButton,
  SortByDecadeButton,
  SortByPopularButton,
  SortByRatingButton,
  SortByServiceButton,
} from '@/components/Sort';

import SortListItem from './components/SortListItem';

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

    <ul className="grid grid-cols-3 md:flex border border-grey-700 rounded-sm">
      <SingleDropdown>
        <SortListItem>
          <SortByDecadeButton pathname={NAVIGATION_PATH} />
        </SortListItem>

        <SortListItem>
          <SortByRatingButton pathname={NAVIGATION_PATH} />
        </SortListItem>

        <SortListItem>
          <SortByPopularButton pathname={NAVIGATION_PATH} />
        </SortListItem>

        <SortListItem>
          <SortByGenreButton pathname={NAVIGATION_PATH} />
        </SortListItem>

        <SortListItem>
          <SortByServiceButton pathname={NAVIGATION_PATH} />
        </SortListItem>
      </SingleDropdown>
    </ul>
  </div>
);

export default SortNavigation;
