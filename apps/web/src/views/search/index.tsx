import type { SearchMovieQuery } from '@/gql';

import { Typography, Pagination, SubHeading } from '@/components';

import SearchResultMovie from './components/SearchResultMovie';

interface SearchPageViewProps extends SearchMovieQuery {
  searchTerm: string;
}

const SearchPageView: React.FC<SearchPageViewProps> = ({
  searchMovie,
  searchTerm,
}) => {
  const { edges, pageInfo, totalPages, totalCount } = searchMovie;

  const hasAnyResult = edges && edges.length > 0;

  return (
    <div className="mt-2 md:mt-4">
      <SubHeading
        title={
          totalCount && totalCount > 0
            ? `Found at least ${totalCount} matches for “${searchTerm}”`
            : 'No results'
        }
        marginBottom
      />

      {!hasAnyResult ? (
        <Typography className="mt-2" component="p">
          There were no matches for your search term.
        </Typography>
      ) : (
        <>
          <ul className="mb-4">
            {edges.map(edge => (
              <SearchResultMovie
                key={`search-result-${edge.node.id}`}
                movie={edge.node}
              />
            ))}
          </ul>

          <Pagination
            currentPage={pageInfo.currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default SearchPageView;
