import { useState } from 'react';

import SortButton from '../../../../../components/Sort/SortButton';

import ReviewYearList from '../ReviewYearList';

interface ReviewsSortButtonsProps {
  user: {
    createdAt: number;
  };
}

type DropdownType = 'year';

const ReviewsSortButtons: React.FC<ReviewsSortButtonsProps> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState<DropdownType>();

  function openDropdown(dropdown: DropdownType) {
    setDropdownOpen(prev => (prev !== dropdown ? dropdown : undefined));
  }

  function closeDropdown() {
    setDropdownOpen(undefined);
  }

  return (
    <SortButton
      text="Diary Year"
      isOpen={dropdownOpen === 'year'}
      onClick={() => openDropdown('year')}
      onClose={() => closeDropdown()}
    >
      <ReviewYearList sinceDate={new Date(user.createdAt)} />
    </SortButton>
  );
};

export default ReviewsSortButtons;
