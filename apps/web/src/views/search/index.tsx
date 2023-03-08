import type { SearchMovieQuery } from '../../graphql';

import PageContent from '../../components/PageContent';
import SubHeading from '../../components/SubHeading';
import Typography from '../../components/Typography';

import SearchResultMovie from './components/SearchResultMovie';
import Pagination from '../../components/Pagination';

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
    <PageContent className="mt-4">
      <SubHeading
        title={
          totalCount && totalCount > 0
            ? `Found at least ${totalCount} matches for “${searchTerm}”`
            : 'No results'
        }
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
    </PageContent>
  );
};

export default SearchPageView;
