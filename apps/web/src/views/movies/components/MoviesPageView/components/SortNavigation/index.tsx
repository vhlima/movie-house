import { useState } from 'react';

import GenreList from '../../../../../../components/Sort/GenreList';
import DecadeList from '../../../../../../components/Sort/DecadeList';

import Typography from '../../../../../../components/Typography';

import SortListItem from './components/SortListItem';

type NavigationFilterType =
  | 'decade'
  | 'rating'
  | 'popular'
  | 'genre'
  | 'service'
  | 'other';

const SortNavigation: React.FC = () => {
  const [dropDownOpen, setDropDownOpen] = useState<string>();

  function openDropDown(dropdown: NavigationFilterType) {
    setDropDownOpen(prev => (prev === dropdown ? undefined : dropdown));
  }

  function closeDropdown() {
    setDropDownOpen(undefined);
  }

  return (
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
        <SortListItem
          text="Decade"
          onClick={() => openDropDown('decade')}
          onClose={() => closeDropdown()}
        >
          {dropDownOpen && dropDownOpen === 'decade' && (
            <DecadeList pathname="/movies" />
          )}
        </SortListItem>

        <SortListItem
          text="Rating"
          onClick={() => openDropDown('rating')}
          onClose={() => closeDropdown()}
        >
          {dropDownOpen && dropDownOpen === 'rating' && (
            <DecadeList pathname="/movies" />
          )}
        </SortListItem>

        <SortListItem
          text="Popular"
          onClick={() => openDropDown('popular')}
          onClose={() => closeDropdown()}
        >
          {dropDownOpen && dropDownOpen === 'popular' && (
            <DecadeList pathname="/movies" />
          )}
        </SortListItem>

        <SortListItem
          text="Genre"
          onClick={() => openDropDown('genre')}
          onClose={() => closeDropdown()}
        >
          {dropDownOpen && dropDownOpen === 'genre' && (
            <GenreList pathname="/movies" />
          )}
        </SortListItem>

        <SortListItem
          text="Service"
          onClick={() => openDropDown('service')}
          onClose={() => closeDropdown()}
        >
          {dropDownOpen && dropDownOpen === 'service' && (
            <DecadeList pathname="/movies" />
          )}
        </SortListItem>

        <SortListItem
          text="Other"
          onClick={() => openDropDown('other')}
          onClose={() => closeDropdown()}
        >
          {dropDownOpen && dropDownOpen === 'other' && (
            <DecadeList pathname="/movies" />
          )}
        </SortListItem>
      </ul>
    </div>
  );
};

export default SortNavigation;
