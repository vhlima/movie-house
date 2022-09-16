import { useQuery } from '@apollo/client';

import ErrorText from '../../../components/ErrorText';

import LoadingSpinner from '../../../components/LoadingSpinner';
import Card from '../../../components/Card';
import PageContent from '../../../components/PageContent';
import MovieCover from '../components/Cover';

const PopularMoviesView: React.FC = () => {
  // const { data, loading, error } = useQuery<FindMovieResponse, FindMovieInput>(
  //   FIND_MOVIE,
  //   {
  //     variables: { movieId: 666 },
  //   },
  // );

  // if (loading) {
  //   return <LoadingSpinner className="flex justify-center mt-4" />;
  // }

  // if (error) {
  //   return <ErrorText text="Error loading movies" />;
  // }

  const items = [];

  for (let i = 0; i < 9; i += 1) {
    items.push(i);
  }

  // const { movie } = data;

  return (
    <PageContent className="h-screen">
      <Card
        className="flex flex-col h-screen"
        title="Popular movies this week"
        noPadding
      >
        <div className="grid grid-cols-3 h-screen gap-1">
          {items.map(numb => (
            <MovieCover
              key={numb}
              // coverUrl={movie.posterUrl}
              coverSize="full"
            />
          ))}
        </div>
      </Card>
    </PageContent>
  );
};

export default PopularMoviesView;
