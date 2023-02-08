import type { SearchMovieQuery } from '../../graphql';

import PageContent from '../../components/PageContent';
import SubHeading from '../../components/SubHeading';
import Typography from '../../components/Typography';

import SearchPageButtons from './components/SearchPageButtons';
import SearchResultMovie from './components/SearchResultMovie';

interface SearchPageViewProps extends SearchMovieQuery {
  searchTerm: string;
}

const SearchPageView: React.FC<SearchPageViewProps> = ({
  searchMovie,
  searchTerm,
}) => {
  const { results, page, totalPages, totalResults } = searchMovie || {};

  const hasAnyResult = results && results.length > 0;

  return (
    <PageContent className="mt-4">
      <SubHeading
        title={
          totalResults && totalResults > 0
            ? `Found at least ${totalResults} matches for “${searchTerm}”`
            : 'No results'
        }
      />

      {!hasAnyResult ? (
        <Typography className="mt-2" component="p">
          There were no matches for your search term.
        </Typography>
      ) : (
        <>
          <ul className="mt-4">
            {results.map(movie => (
              <SearchResultMovie
                key={`search-result-${movie.id}`}
                movie={movie}
              />
            ))}
          </ul>

          <SearchPageButtons
            page={page}
            totalPages={totalPages}
            searchTerm={searchTerm}
          />
        </>
      )}
    </PageContent>
  );
};

export default SearchPageView;
