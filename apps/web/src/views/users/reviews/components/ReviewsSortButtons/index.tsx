import { SortButton } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

import ReviewYearList from '../ReviewYearList';

interface ReviewsSortButtonsProps {
  user: {
    createdAt: number;
  };
}

const ReviewsSortButtons: React.FC<ReviewsSortButtonsProps> = ({ user }) => (
  <SingleDropdown>
    <SortButton type="year" text="Diary Year" intent="secondary">
      <ReviewYearList sinceDate={new Date(user.createdAt)} />
    </SortButton>
  </SingleDropdown>
);

export default ReviewsSortButtons;
