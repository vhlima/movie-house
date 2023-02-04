import { useState } from 'react';

import { parseISO } from 'date-fns';

import ReviewSortByYearButton from '../ReviewSortByYearButton';

interface ReviewsSortButtonsProps {
  user: {
    createdAt: string;
  };
}

const ReviewsSortButtons: React.FC<ReviewsSortButtonsProps> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState<string>('');

  return (
    <ReviewSortByYearButton
      sinceDate={parseISO(user.createdAt)}
      isOpen={dropdownOpen === 'by-year'}
      onClick={() =>
        setDropdownOpen(prev => (prev === 'by-year' ? '' : 'by-year'))
      }
    />
  );
};

export default ReviewsSortButtons;
