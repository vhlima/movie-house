import { eachYearOfInterval } from 'date-fns';

import SortButton from '../../../../../components/Sort/SortButton';
import SortDropdown from '../../../../../components/Sort/SortDropdown';

interface ReviewSortByYearButtonProps {
  sinceDate: Date;

  isOpen?: boolean;
  onClick: () => void;
}

const ReviewSortByYearButton: React.FC<ReviewSortByYearButtonProps> = ({
  sinceDate,
  isOpen,
  onClick,
}) => {
  const years = [
    { id: '-1', name: 'Any year' },
    ...eachYearOfInterval({
      start: sinceDate,
      end: new Date(),
    })
      .sort((y1, y2) => y2.getTime() - y1.getTime())
      .map(year => ({
        id: `${year.getFullYear()}`,
        name: `${year.getFullYear()}`,
      })),
  ];

  // TODO add [username] variable to url

  return (
    <SortButton text="Diary Year" isOpen={isOpen} onClick={onClick}>
      <SortDropdown
        singleOption
        queryKey="year"
        items={years}
        pathname={{
          clean: `/users/[username]/reviews`,
          sort: `/users/[username]/reviews/year/[year]`,
        }}
      />
    </SortButton>
  );
};

export default ReviewSortByYearButton;
