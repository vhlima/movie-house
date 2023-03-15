import { eachYearOfInterval } from 'date-fns';

import { useProfile } from '@/hooks/useProfile';

import SortDropdown from '../../../../../components/Sort/SortDropdown';

interface ReviewYearListProps {
  sinceDate: Date;
}

const ReviewYearList: React.FC<ReviewYearListProps> = ({ sinceDate }) => {
  const { user } = useProfile();

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

  return (
    <SortDropdown
      singleOption
      queryKey="year"
      items={years}
      pathname={{
        clean: {
          pathname: `/users/[username]/reviews`,
          query: {
            username: user.username,
          },
        },
        sort: {
          pathname: `/users/[username]/reviews/year/[year]`,
          query: {
            username: user.username,
          },
        },
      }}
    />
  );
};

export default ReviewYearList;
