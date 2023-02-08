import clsx from 'clsx';
import Link from '../../../../components/Link';

interface SearchPageButtonsProps {
  searchTerm: string;
  page: number;
  totalPages: number;
}

const SearchPageButtons: React.FC<SearchPageButtonsProps> = ({
  searchTerm,
  page,
  totalPages,
}) => (
  <div className="flex items-center justify-center mt-4 pt-4 mb-2 border-t border-t-grey-700">
    {[1, 2, 3, 4, 5, totalPages].map(pageNumber => (
      <Link
        key={`search-pagination-${pageNumber}`}
        className={clsx('block py-1 rounded-sm text-grey-200', {
          'px-3': pageNumber < 10,
          'px-2': pageNumber >= 10,
          'hover:bg-grey-800': page !== pageNumber,
          'bg-grey-800': page === pageNumber,
        })}
        href={{
          pathname: '/search/[searchTerm]/page/[pageNumber]',
          query: {
            searchTerm,
            pageNumber,
          },
        }}
      >
        {pageNumber}
      </Link>
    ))}
  </div>
);

export default SearchPageButtons;
