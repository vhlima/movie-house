import SortDropdown from '../SortDropdown';

interface PopularListProps {
  pathname: string;
}

const PopularList: React.FC<PopularListProps> = ({ pathname }) => {
  const decades = [
    { id: '-1', name: 'All time' },
    // { id: 'year', name: 'This year' },
  ];

  return (
    <SortDropdown
      singleOption
      items={decades}
      queryKey="popularity"
      pathname={{
        clean: pathname,
        sort: `${pathname}/popularity/[popularity]`,
      }}
    />
  );
};

export default PopularList;
