import { Typography } from '@/components';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

import {
  DecadeDropdown,
  GenreDropdown,
  ServiceDropdown,
  SortButton,
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
        <SortButton type="decade">
          <DecadeDropdown pathname={NAVIGATION_PATH} />
        </SortButton>

        <SortButton type="genre">
          <GenreDropdown pathname={NAVIGATION_PATH} />
        </SortButton>

        <SortButton type="service">
          <ServiceDropdown pathname={NAVIGATION_PATH} />
        </SortButton>
      </SingleDropdown>
    </div>
  </div>
);

export default SortNavigation;
